import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams; 
    // const queries = {};
    // for (const [key, value] of searchParams.entries()) {
    //     queries[key] = value;
    // }

    // const url = `http://IP/messages/by-host?hostname=${searchParams.get('hostname')}`;

    const timestamp = searchParams.get('timeFilter');
    const keyWord = searchParams.get('keyWord');

    if(timestamp){
        console.log(timestamp)
        let minutes = 0;
        if(timestamp == '12hr'){
            minutes = 12*60;
        }
        else if(timestamp == '1hr'){
            minutes = 60;
        }
        else if(timestamp == '15min'){
            minutes = 15;
        }
        else if(timestamp == '6hr'){
            minutes = 6*60;
        }
        else if(timestamp == '24hr'){
            minutes = 24*60;
        }
        const data = await fetch(`http://localhost:8081/messages/timestamp?interval=${minutes}`);
        const jsonData = await data.json();
        return NextResponse.json(jsonData);
    }

    if(keyWord){
        console.log(keyWord)
        const data = await fetch(`http://localhost:8081/messages/keyword?word=${keyWord}`);
        const jsonData = await data.json();
        return NextResponse.json(jsonData);
    }
    

    const data = await fetch('http://localhost:8081/messages');
    const jsonData = await data.json();
    return NextResponse.json(jsonData);
}