import Card from 'react-bootstrap/Card';
import {Stack} from "react-bootstrap";
export default function Home(){
  const cards = [{title: 'Card 1', text: 'Description for the first card'}, {title: 'Card 2', text: 'Description for the second card'}, {title: 'Card 3', text: 'Description for the third card'}]
  return (
    <div style={{ backgroundColor:'#00800029',display:'flex', flexDirection: 'column', flex:1, justifyContent: 'space-around', alignItems:'center', height:'100vh'}}>
    <h2>This is the home page from the remote application</h2>
      <Stack direction={'horizontal'} style={{justifyContent: 'center', gap:'2rem'}}>
        {cards.map((card)=>{
          return (
            <Card style={{ width: '18rem' }} key={card.title}>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>
                  {card.text}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </Stack>
    </div>
  )
}
