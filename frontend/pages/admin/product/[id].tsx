const Product = ({ product }: any) => {

}

export async function getServerSideProps(context: any) {
    const { id } = context.query
    const product = id;
    return {
        props: {
            product
        }
    }
}

export default Product
