
export default function CartCard(props) {
    console.log("ciao");

    return (



        props.props.map((prop) => (
            <>
                <div className="container_cart" >
                    <img src={prop.img} alt={prop.name} />
                    <div>
                        <h2>{prop.name}</h2>
                        <p>€{prop.price}</p>
                        <p>{prop.quantity}</p>
                    </div>

                </div>
            </>))


    )
}