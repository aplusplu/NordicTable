function MenuFilters({ // Updated function signature to include props for category filtering, search, and sorting function MenuFilters
  selectedCategory, // Add selectedCategory prop for category filtering
  onCategoryChange, //          Add onCategoryChange prop for handling category changes
  searchTerm, // Add searchTerm prop for search functionality
  onSearchChange, // Add searchTerm and onSearchChange props
  sortOrder, // Add sortOrder prop for sort order
  onSortChange, // Add onSortChange prop for handling sort order changes
}) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="h-[44px] border border-[#CDB68A] bg-white px-3 text-[14px] text-[#1A1A1A] outline-none"
      >
        <option value="all">Alle kategorier</option>
        <option value="starter">Forretter</option>
        <option value="main">Hovedretter</option>
        <option value="dessert">Desserter</option>
      </select>

      {/* Search */}
      <input
        type="text"
        placeholder="Søg på titel..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-[44px] border border-[#CDB68A] bg-white px-3 text-[14px] text-[#1A1A1A] outline-none placeholder:text-[#8A8A8A]"
      />

      {/* Sort */}
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="h-[44px] border border-[#CDB68A] bg-white px-3 text-[14px] text-[#1A1A1A] outline-none"
      >
        <option value="default">Standard sortering</option>
        <option value="price-asc">Pris: lav til høj</option>
        <option value="price-desc">Pris: høj til lav</option>
      </select>
    </div>
  );
}
//used in menu page for filtering and sorting the dishes based on category, search term, and sort order. The MenuFilters component provides a user interface for selecting a category, entering a search term, and choosing a sort order, which then updates the state in the parent Menu component to filter and sort the displayed dishes accordingly. This allows users to easily find and organize the dishes on the menu based on their preferences, enhancing the user experience by providing intuitive controls for navigating the menu offerings.
export default MenuFilters;
