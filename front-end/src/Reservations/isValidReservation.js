export function isValidReservation(reservation){
    const date = reservation.reservation_date;
    const time = reservation.reservation_time;
    const compoundDate = `${date}T${time}`

    let newDate = new Date(Date.parse(compoundDate));
    let today = new Date();
    let day = newDate.getDay();


    const errors = [];


    if(day === 2){
        errors.push(new Error("Restaurant is closed on Tuesdays"));
    }
    if(newDate.getTime() < today.getTime()){
        errors.push(new Error("Bookings must be made for a future date"))

    }
    
    const hours = time.substring(0,2);
    const minutes = time.substring(3,5);

    if(hours < 10 || hours > 9){
        errors.push(new Error("Cannot make reseravtion at that time. Operating hours are from 10:30AM to 10:30PM"))
    }
    else if((hours === 10 && minutes <30) || (hours === 21 && minutes > 30)){
        errors.push(new Error("Cannot make reseravtion at that time. Operating hours are from 10:30AM to 10:30PM"))
    }
    
    console.log(errors);
    console.log(hours, minutes);

    return errors;



}