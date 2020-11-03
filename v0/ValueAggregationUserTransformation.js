function transform(events) {    
    
    //in the below example, aggregation of three attributes - 'bet_amount', 'win_amount' and 'no_of_spin'
	//for all 'spin_result' events in the batch is being performed and instead of N 'spin_result' events,
	//a single 'spin_result' event with cumulative values is being provided
    let spin_result_events = events.filter(event => {
        return event.event == "spin_result";
    });
    let bet_amount = 0;
    let win_amount = 0;
    let no_of_spin = 0;
    
    // sum these props
    
    spin_result_events.forEach(spEvent => {
        bet_amount +=  spEvent.properties.bet_amount ?  spEvent.properties.bet_amount : 0;
        win_amount +=  spEvent.properties.win_amount ?  spEvent.properties.win_amount : 0;
        no_of_spin +=  spEvent.properties.no_of_spin ?  spEvent.properties.no_of_spin : 0;
    })
    
    
    
    // modify the first spin_result_event
    if(spin_result_events.length > 0) {
        spin_result_events[0].properties.bet_amount = bet_amount;
        spin_result_events[0].properties.win_amount = win_amount;
        spin_result_events[0].properties.no_of_spin = no_of_spin;
    }
    
    // other than spin event
    let otherEvents = events.filter(event => {
        return event.event != "spin_result";
    });
    
    
    if(otherEvents.length === 0) {
        otherEvents = [];
    }
    
    // add a single spin event
    
    if(spin_result_events.length > 0) {
        otherEvents.push(spin_result_events[0]);
    }
    
    return otherEvents;
}