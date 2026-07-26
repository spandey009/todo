export default function TaskProgress({ todos }) {

    const totalTasks = todos.length;

    const completedTasks = todos.filter(
        (todo) => todo.completed
    ).length;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks / totalTasks) * 100
            );


    return (
        <section className="progress-section">

            <div className="progress-header">

                <div>
                    <h3>Your Progress</h3>

                    <p>
                        {completedTasks} of {totalTasks} tasks completed
                    </p>
                </div>

                <span className="progress-percentage">
                    {progress}%
                </span>

            </div>


            <div className="progress-bar">

                <div
                    className="progress-fill"
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>


            {progress === 100 && totalTasks > 0 && (

                <p className="all-completed">
                    🎉 Great work! All tasks completed.
                </p>

            )}

        </section>
    );
}