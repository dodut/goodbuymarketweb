function ChildComponent(props){
    const {name, age} = props;
    return <div>
        <p>이름 {name} 이며, 나이 {age}</p>
        </div>;
}

export default ChildComponent;