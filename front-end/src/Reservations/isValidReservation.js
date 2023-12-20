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
    console.log(errors);

    return errors;



}