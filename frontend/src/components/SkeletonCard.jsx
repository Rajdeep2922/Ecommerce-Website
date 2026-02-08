function SkeletonCard() {
    return (
        <div className="product-card skeleton-card">
            <div className="skeleton-image skeleton-pulse"></div>
            <div className="product-info">
                <div className="skeleton-title skeleton-pulse"></div>
                <div className="skeleton-price skeleton-pulse"></div>
                <div className="skeleton-button skeleton-pulse"></div>
            </div>
        </div>
    )
}

export default SkeletonCard
