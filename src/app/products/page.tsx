
export default async function ProductsPage() {
    const response = await fetch('https://api.github.com/users/itorisaias', {
        // next: {
        //     revalidate: 30
        // },
        // cache: 'no-store'
    })
    const products = response.json();

    return (
        <div>
            <h1>Products Page</h1>
            {JSON.stringify(products, null, 2)}
        </div>
    )
}