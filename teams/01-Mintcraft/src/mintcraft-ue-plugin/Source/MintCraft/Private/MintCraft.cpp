// Copyright Epic Games, Inc. All Rights Reserved.

#include "MintCraft.h"
#include "MintCraftStyle.h"
#include "MintCraftCommands.h"
#include "LevelEditor.h"
#include "Widgets/Docking/SDockTab.h"
#include "Widgets/Layout/SBox.h"
#include "Widgets/Text/STextBlock.h"
#include "ToolMenus.h"
#include "MintCraftMainWindow.h"

static const FName MintCraftTabName("MintCraft");

#define LOCTEXT_NAMESPACE "FMintCraftModule"

void FMintCraftModule::StartupModule()
{
	// This code will execute after your module is loaded into memory; the exact timing is specified in the .uplugin file per-module
	
	FMintCraftStyle::Initialize();
	FMintCraftStyle::ReloadTextures();

	FMintCraftCommands::Register();
	
	PluginCommands = MakeShareable(new FUICommandList);

	PluginCommands->MapAction(
		FMintCraftCommands::Get().OpenPluginWindow,
		FExecuteAction::CreateRaw(this, &FMintCraftModule::PluginButtonClicked),
		FCanExecuteAction());

	UToolMenus::RegisterStartupCallback(FSimpleMulticastDelegate::FDelegate::CreateRaw(this, &FMintCraftModule::RegisterMenus));
	
	FGlobalTabmanager::Get()->RegisterNomadTabSpawner(MintCraftTabName, FOnSpawnTab::CreateRaw(this, &FMintCraftModule::OnSpawnPluginTab))
		.SetDisplayName(LOCTEXT("FMintCraftTabTitle", "MintCraft"))
		.SetMenuType(ETabSpawnerMenuType::Hidden);

	MainWindow = NewObject<UMintCraftMainWindow>(GetTransientPackage());
	MainWindow->AddToRoot();
}

void FMintCraftModule::ShutdownModule()
{
	// This function may be called during shutdown to clean up your module.  For modules that support dynamic reloading,
	// we call this function before unloading the module.

	UToolMenus::UnRegisterStartupCallback(this);

	UToolMenus::UnregisterOwner(this);

	FMintCraftStyle::Shutdown();

	FMintCraftCommands::Unregister();

	FGlobalTabmanager::Get()->UnregisterNomadTabSpawner(MintCraftTabName);
}

static bool ShouldShowProperty(const FPropertyAndParent& PropertyAndParent, bool bHaveTemplate)
{
	const UProperty& Property = PropertyAndParent.Property;

	if (bHaveTemplate)
	{
		const UClass* PropertyOwnerClass = Property.GetOwner<const UClass>();
		const bool bDisableEditOnTemplate = PropertyOwnerClass
			&& PropertyOwnerClass->IsNative()
			&& Property.HasAnyPropertyFlags(CPF_DisableEditOnTemplate);
		if (bDisableEditOnTemplate)
		{
			return false;
		}
	}
	return true;
}

TSharedRef<SDockTab> FMintCraftModule::OnSpawnPluginTab(const FSpawnTabArgs& SpawnTabArgs)
{
	FDetailsViewArgs Args;
	Args.bHideSelectionTip = true;
	Args.bLockable = false;
	TArray<UObject*> ObjectsToView;
	ObjectsToView.Add(MainWindow);

	FPropertyEditorModule& PropertyEditorModule = FModuleManager::GetModuleChecked<FPropertyEditorModule>("PropertyEditor");
	TSharedRef<IDetailsView> DetailView = PropertyEditorModule.CreateDetailView(Args);

	bool bHaveTemplate = false;
	for (int32 i = 0; i < ObjectsToView.Num(); i++)
	{
		if (ObjectsToView[i] != NULL && ObjectsToView[i]->IsTemplate())
		{
			bHaveTemplate = true;
			break;
		}
	}

	DetailView->SetIsPropertyVisibleDelegate(FIsPropertyVisible::CreateStatic(&ShouldShowProperty, bHaveTemplate));

	DetailView->SetObjects(ObjectsToView);

	return SNew(SDockTab)
		.TabRole(ETabRole::NomadTab)
		[
			DetailView
		];
}

void FMintCraftModule::PluginButtonClicked()
{
	FGlobalTabmanager::Get()->TryInvokeTab(MintCraftTabName);
}

void FMintCraftModule::RegisterMenus()
{
	// Owner will be used for cleanup in call to UToolMenus::UnregisterOwner
	FToolMenuOwnerScoped OwnerScoped(this);

	{
		UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("LevelEditor.MainMenu.Window");
		{
			FToolMenuSection& Section = Menu->FindOrAddSection("MintCraft");
			Section.AddMenuEntryWithCommandList(FMintCraftCommands::Get().OpenPluginWindow, PluginCommands);
		}
	}

	{
		UToolMenu* ToolbarMenu = UToolMenus::Get()->ExtendMenu("LevelEditor.LevelEditorToolBar");
		{
			FToolMenuSection& Section = ToolbarMenu->FindOrAddSection("MintCraft");
			{
				FToolMenuEntry& Entry = Section.AddEntry(FToolMenuEntry::InitToolBarButton(FMintCraftCommands::Get().OpenPluginWindow));
				Entry.SetCommandList(PluginCommands);
			}
		}
	}
}

#undef LOCTEXT_NAMESPACE
	
IMPLEMENT_MODULE(FMintCraftModule, MintCraft)