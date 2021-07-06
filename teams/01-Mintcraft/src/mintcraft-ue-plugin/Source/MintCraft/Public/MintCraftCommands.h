// Copyright Epic Games, Inc. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Framework/Commands/Commands.h"
#include "MintCraftStyle.h"

class FMintCraftCommands : public TCommands<FMintCraftCommands>
{
public:

	FMintCraftCommands()
		: TCommands<FMintCraftCommands>(TEXT("MintCraft"), NSLOCTEXT("Contexts", "MintCraft", "MintCraft Plugin"), NAME_None, FMintCraftStyle::GetStyleSetName())
	{
	}

	// TCommands<> interface
	virtual void RegisterCommands() override;

public:
	TSharedPtr< FUICommandInfo > OpenPluginWindow;
};