import { ReactElement, useEffect, useState } from "react";

interface ListProps {
    getItems(): number[],
}

const List: React.FC<ListProps> = ({
    getItems,
}): ReactElement => {
    const [items, setItems] = useState<number[]>([]);

    // This useEffect hook is called whenever the getItems function is changed
    useEffect(() => {
        setItems(getItems());
        console.log("Updating Items")
    }, [getItems]);

    return (<div> {items.map(item => <div key={item}>{item}</div>)} </div>);
}

export default List;