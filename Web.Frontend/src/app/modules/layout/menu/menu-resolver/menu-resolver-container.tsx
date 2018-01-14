import * as React from "react";
import { Container } from "flux/utils";

import { IdentityStore } from "../../../../stores/identity/identity-store";
import { UserKind } from "../../../../stores/identity/identity-contracts";
import { AdministratorMenuCView } from "../../../administrator/components/menu/administrator-menu-cview";
import { CollectorMenuCView } from "../../../collector/components/menu/collector-menu-cview";

interface State {
    UserKind: UserKind | undefined;
}

class MenuResolverContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [IdentityStore];
    }

    public static calculateState(): State {
        return {
            UserKind: IdentityStore.UserKind
        };
    }

    public render(): JSX.Element | null {
        if (this.state.UserKind == null) {
            return null;
        }

        switch (this.state.UserKind) {
            case UserKind.Administrator: {
                return <AdministratorMenuCView />;
            }
            case UserKind.Collector: {
                return <CollectorMenuCView />;
            }
        }
    }
}

export const MenuResolverContainer = Container.create(MenuResolverContainerClass);
