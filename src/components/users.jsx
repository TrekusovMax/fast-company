import React, { useState } from "react"
import api from "../api"

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userID) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userID))
  }
  const renderPhrase = (number) => {
    let str = "человек тусанёт"
    const lastNum = Number(number.toString().slice(-1))
    if (number > 4 && number < 15) {
      str = "человек тусанут"
    }
    if ([2, 3, 4].indexOf(lastNum) >= 0) {
      str = "человека тусанут"
    }
    return (
      <h2>
        <span className="badge bg-primary">
          {number} {str} с тобой
        </span>
      </h2>
    )
  }
  if (users.length === 0) {
    return (
      <h2>
        <span className="badge bg-danger">Никто не тусанёт с тобой</span>
      </h2>
    )
  }
  return (
    <>
      {renderPhrase(users.length)}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id.toString()}>
                <td key={user.name.toString()}>{user.name}</td>
                <td>
                  {user.qualities.map((q) => {
                    let color = "badge bg-" + q.color
                    return (
                      <React.Fragment key={q._id.toString()}>
                        <span key={q._id.toString()} className={color}>
                          {q.name}
                        </span>{" "}
                      </React.Fragment>
                    )
                  })}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Users
