import { Abstractions } from "simplr-flux";

export function ItemsStatusResolver(...statuses: Abstractions.ItemStatus[]): Abstractions.ItemStatus {
    let loadedCount: number = 0;
    let noDataCount: number = 0;
    let pendingCount: number = 0;

    for (let i = 0; i < statuses.length; i++) {
        const status = statuses[i];
        switch (status) {
            case Abstractions.ItemStatus.Failed:
                return status;
            case Abstractions.ItemStatus.Loaded:
                loadedCount++;
                break;
            case Abstractions.ItemStatus.NoData:
                noDataCount++;
                break;
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending:
                pendingCount++;
                break;
        }
    }

    if (pendingCount > 0) {
        return Abstractions.ItemStatus.Pending;
    } else if (loadedCount === 0 && noDataCount > 0) {
        return Abstractions.ItemStatus.NoData;
    } else {
        return Abstractions.ItemStatus.Loaded;
    }
}
