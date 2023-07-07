food.filter((foods => foods.UserId === userContext[0].id)).





<tbody>
                        {food ? (
                            food.map((foods, id) => (
                            <tr key={id}>
                                <td>{foods.UserId}</td>
                                <td>{foods.name}</td>
                                <td>{foods.protein}</td>
                                <td>{foods.carbs}</td>
                                <td>{foods.fat}</td>
                                <td>{foods.servings}</td>
                                <td>{foods.grams}</td>
                                <td>{/* Placeholder for the missing data */}</td>
                                <td>
                                    <button className="icon-container">
                                        <img
                                        className="trash-icon small-icon"
                                        src={trashIcon}
                                        ref={inputRef}
                                        onClick={() => {deleteFoodDb(foods.name)}}
                                        />
                                    </button>
                                </td>
                            </tr>
                            ))
                        ) : null}
                    </tbody>