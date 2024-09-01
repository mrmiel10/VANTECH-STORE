

export const getStartAndEndOfPeriod = (name:"week" | "month" | "all") => {
    const today = new Date()
 if(name === "week") {
    const start =  new Date(today.getFullYear(),today.getMonth(),today.getDate() - today.getDay() + 1)
    const end = new Date(start.getFullYear(),start.getMonth(), start.getDate() + 6)
 
return {
    start,
    end
}


}
else if(name ==="month"){
    const start =  new Date(today.getFullYear(),today.getMonth() ,1)
    const end = new Date(start.getFullYear(),start.getMonth() + 1, 0)
    return {
        start,
        end
    }
}
}
