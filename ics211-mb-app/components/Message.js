

const Message=({msgNum,name,msgText})=>{
    return <tr className="justify-content-center">
            <td>{msgNum}</td>
            <td>{name}</td>
            <td>{msgText}</td>
        </tr>
}

export default Message;