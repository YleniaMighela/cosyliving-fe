
export default function CartCard(props) {
    console.log("ciao");

    return (



        props.props.map((prop) => (
            <>
                <div className="container_review" >
                    <img src={prop.img} alt={prop.name} />
                    <h2>{prop.name}</h2>
                    <p>€{prop.price}</p>
                    <p>{prop.quantity}</p>
                </div>
            </>))


    )
}