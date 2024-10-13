function calculateMonthlyTarget(startDate, endDate, annualTarget, excludedDays = [5]) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let daysInMonth = [];
    let actualWorkedDays = [];
    let monthlyTargets = [];
    let totalCalculatedTarget = 0;

    // Loop through each month from startDate to endDate
    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
        const firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
        const lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);

        const effectiveStart = (current.getFullYear() === start.getFullYear() && current.getMonth() === start.getMonth())
            ? start
            : firstDay;
        const effectiveEnd = (current.getFullYear() === end.getFullYear() && current.getMonth() === end.getMonth())
            ? end
            : lastDay;

        let totalDays = 0;
        let workedDays = 0;

        // Count days excluding specified days
        for (let date = new Date(effectiveStart); date <= effectiveEnd; date.setDate(date.getDate() + 1)) {
            if (!excludedDays.includes(date.getDay())) {
                totalDays++;
                workedDays++;
            }
        }

        daysInMonth.push(totalDays);
        actualWorkedDays.push(workedDays);

        // Calculate monthly target
        const monthlyTarget = (workedDays / totalDays) * (annualTarget / 12);
        monthlyTargets.push(monthlyTarget);
        totalCalculatedTarget += monthlyTarget;

        // Move to the next month
        current.setMonth(current.getMonth() + 1);
    }

    return {
        daysInMonth,
        actualWorkedDays,
        monthlyTargets,
        totalCalculatedTarget
    };
}

// Example usage
const startDate = '2024-01-01';
const endDate = '2024-03-31';
const annualTarget = 5220;

// Call the function excluding Fridays
const result = calculateMonthlyTarget(startDate, endDate, annualTarget, [5]);

// Displaying results
console.log("Days excluding specified days: ", result.daysInMonth);
console.log("Days worked excluding specified days: ", result.actualWorkedDays);
console.log("Monthly targets: ", result.monthlyTargets);
console.log("Total target: ", result.totalCalculatedTarget);

