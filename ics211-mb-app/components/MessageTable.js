import Table from 'react-bootstrap/Table';
import Message from './Message';


const MessageTable=({messages})=>{
    


    return(
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td><b>#</b></td>
                    <td><b>Name</b></td>
                    <td><b>Message</b></td>
                </tr>
            </thead>

            <tbody>
                {messages.map((message,index)=>
                    <Message key={message.id}{...message} msgNum={messages.length - index}/>  
                )}
            </tbody>
            
        </Table>
        </>
        
    ); 
};

export default MessageTable;