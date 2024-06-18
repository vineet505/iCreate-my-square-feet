function timeStamptoLocalDate(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }
  
  function decimalFormatter(number) {
    return number.toFixed(2).toString();
  }

export function RecentTransactionFormatter(data) {
    let transactions =[]
    data.map((item, index) => {
        transactions.push({
            id:  item.id,
            sno: item.profile_picture_url,
            headline: item.user_name,
            subheadline: item.transaction_date,
            amount: item.transaction_amount,
            color: item.transaction_type == "DEPOSIT" ?"bg-[#dc2626]": "bg-[#059669]",
            type: item.transaction_type
        })
    })
    return transactions
}

export function RecentPropertyTransactionFormatter(data) {
    let transactions =[]
    data.map((item, index) => {
        transactions.push({
            id:  item._id,
            title: item.title,
            body: item.body,
            project_logo: item.picture_url,
            date: timeStamptoLocalDate(item.created_at),
            type: item.source_type
        })
    })
    return transactions
}

export function ProjectsFormatter(data) {
    let projects =[]
    data.map((item, index) => {
        projects.push({
            id:  item.id,
            projectLogo: item.project_logo,
            productCategory: item.category,
            productName: item.project_title,
            saleValue: item.price,
            saleInfo: item.created_at,
            status: item.listed_by
        })
    })
    return projects
}