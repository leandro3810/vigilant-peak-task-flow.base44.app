export function formatListItem(item: string): string {
    return item.trim().charAt(0).toUpperCase() + item.slice(1);
}

export function validateListItem(item: string): boolean {
    return item.length > 0;
}
