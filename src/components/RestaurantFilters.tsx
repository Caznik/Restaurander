function RestaurantFilters() {
	return(
		<>
			<div className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-6xl mx-auto">
					<button
						//onClick={() => setIsExpanded(!isExpanded)}
						className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
					>
						<span className="text-gray-700">Filtros</span>

					</button>
				</div>
			</div>
		</>
	)
}

export default RestaurantFilters;