

users [icon: user] {
  id number pk
  firstName string
  lastName string
  email string
  age number
}

login [icon: lock] {
  id number pk
  userName string
  password string
}

role [icon: lock] {
  id number pk
  title string
  description string
}

dishes [icon: ] {
  id number pk
  name string
  description string
  price number
  image string
}

orders [icon: shopping-cart] {
  id number pk
  quantity number
  address number
}

payment [icon: credit-card] {
  id number pk
  totalamount number
  amountpaid number
}



users.id - role.id
users.id - login.id
users.id < dishes.id
users.id < orders.id
orders.id - payment.id
orders.id <> dishes.id