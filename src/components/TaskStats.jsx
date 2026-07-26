export default function TaskStats({ todos }) {

    const totalTasks = todos.length;

    const completedTasks = todos.filter(
        (todo) => todo.completed
    ).length;

    const pendingTasks =
        totalTasks - completedTasks;


    return (
        <section className="stats">

            <div className="stat-card">

                <div className="stat-icon">
                    📋
                </div>

                <div>
                    <h2>{totalTasks}</h2>
                    <p>Total Tasks</p>
                </div>

            </div>


            <div className="stat-card">

                <div className="stat-icon">
                    ⏳
                </div>

                <div>
                    <h2>{pendingTasks}</h2>
                    <p>Pending</p>
                </div>

            </div>


            <div className="stat-card">

                <div className="stat-icon">
                    ✅
                </div>

                <div>
                    <h2>{completedTasks}</h2>
                    <p>Completed</p>
                </div>

            </div>

        </section>
    );
}