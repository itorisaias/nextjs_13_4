import Link from "next/link";

interface ProductDetailPage {
    params: {
        slug: string
    }
}

export default function ProductDetailPage({ params }: ProductDetailPage) {
    return (
        <div>
            <h1>Product Detail Page</h1>
            <span>{params.slug}</span>
        </div>
    )
}