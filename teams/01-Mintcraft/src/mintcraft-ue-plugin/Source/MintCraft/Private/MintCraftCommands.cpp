// Copyright Epic Games, Inc. All Rights Reserved.

#include "MintCraftCommands.h"

#define LOCTEXT_NAMESPACE "FMintCraftModule"

void FMintCraftCommands::RegisterCommands()
{
	UI_COMMAND(OpenPluginWindow, "MintCraft", "Bring up MintCraft window", EUserInterfaceActionType::Button, FInputGesture());
}

#undef LOCTEXT_NAMESPACE
