#include "MintCraftMainWindow.h"


void UMintCraftMainWindow::TestFunc()
{
    ++index;
}

void UMintCraftMainWindow::PostEditChangeProperty(struct FPropertyChangedEvent& PropertyChangedEvent)
{
    FString PropertyName = PropertyChangedEvent.Property->GetName();
    FString MemberPropertyName = PropertyChangedEvent.MemberProperty->GetName();

    if (PropertyName == TEXT("size"))
    {
        if (actor) {
            if (actor->GetRootComponent()) {
                actor->GetRootComponent()->SetWorldScale3D(FVector(size / 1000, size / 1000, size / 1000));
            }
        }
    }
}
