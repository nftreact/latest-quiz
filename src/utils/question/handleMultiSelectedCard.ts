export const handleItemSelection = (itemId: string, setSelectedItems: any, selectedItems: string[]) => {
  // Check if the item is already selected
  const isSelected = selectedItems.includes(itemId);

  if (isSelected) {
    // If selected, remove it from the selectedItems array

    setSelectedItems((prevSelectedItems: string[]) => prevSelectedItems.filter((id) => id !== itemId));
  } else {
    // If not selected, add it to the selectedItems array

    setSelectedItems((prevSelectedItems: string[]) => [...prevSelectedItems, itemId]);
  }
};
