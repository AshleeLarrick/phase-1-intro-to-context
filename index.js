function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }

}

function createEmployeeRecords(array) {
    let employee_records = []
    for (let i = 0; i < array.length; i++) {
        let employee_record = createEmployeeRecord(array[i])
        employee_records.push(employee_record)
    }
    return employee_records

}

function createTimeInEvent(employee_record, timestamp) {

    employee_record.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(timestamp.split(" ")[1]),
            date: timestamp.split(" ")[0]
        }
    )
    return employee_record

}

function createTimeOutEvent(employee_record, timestamp) {
    employee_record.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: parseInt(timestamp.split(" ")[1]),
            date: timestamp.split(" ")[0]
        }
    )
    return employee_record
}

function hoursWorkedOnDate(employee_record, date) {

    for(let i = 0; i < employee_record.timeInEvents.length; i++) {
        if(employee_record.timeInEvents[i].date == date) {
            for(let j = 0; j < employee_record.timeOutEvents.length; j++) {
                if(employee_record.timeOutEvents[i].date == date) {
                    return (employee_record.timeOutEvents[i].hour - 
                    employee_record.timeInEvents[i].hour) /100
                }
            }

        }
    }
    return 0

}

function wagesEarnedOnDate(employee_record, date) {
    return hoursWorkedOnDate(employee_record, date) * employee_record.payPerHour
}

function allWagesFor(employee_record) {
    let total_hours_worked = 0
    for(let i = 0; i < employee_record.timeInEvents.length; i++) {
        let date = employee_record.timeInEvents[i].date
        total_hours_worked += hoursWorkedOnDate(employee_record, date)
    }
    return total_hours_worked * employee_record.payPerHour
}

function calculatePayroll(employee_records) {
    let total_pay = 0

    for(const employee_record of employee_records) {
        total_pay += allWagesFor(employee_record)
    }
    return total_pay

}