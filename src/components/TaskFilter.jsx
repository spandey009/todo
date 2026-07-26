export default function TaskFilter({
    filter,
    setFilter
}) {

    return (
        <div className="filters">

            {["All", "Pending", "Completed"].map(
                (filterName) => (

                    <button
                        key={filterName}
                        className={
                            filter === filterName
                                ? "filter-btn active"
                                : "filter-btn"
                        }
                        onClick={() =>
                            setFilter(filterName)
                        }
                    >
                        {filterName}
                    </button>

                )
            )}

        </div>
    );
}