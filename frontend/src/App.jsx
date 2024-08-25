import { useEffect, useState } from 'react'
import TaskRow from './TaskRow'
import NewTaskForm from './NewTaskForm'


/**
 * task一覧のコンポーネント
 */
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ここで検索ボックスの入力値を管理
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  ///ページが読み込まれたときにまるっとTODOをもってくる///
  // useEffect(() => {
  //   async function getAllTasks(searchTitle = "") {
  //     const res = await fetch(`http://localhost:3000/api/v1/tasks?title=${searchTitle}`, {
  //       mode: "cors",
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     setTasks(data.data);
  //     setIsLoading(false);
  //   }
  //   getAllTasks();
  // }, []);

  async function getAllTasks(searchTitle = "") {
    const res = await fetch(`http://localhost:3000/api/v1/tasks?title=${searchTitle}`, {
      mode: "cors",
    });
    const data = await res.json();
    console.log(data);
    setTasks(data.data);
    setIsLoading(false);
  }




  useEffect(() => {
    getAllTasks();
  }, []);













  // 検索ボタンがクリックされたときに実行する関数
  const handleSearch = () => {
    getAllTasks(searchTerm);
  };



  ///新規追加ボタンが押されたときの処理///
  const handleAddNew = () => {
    setIsAdding(true);
  };


  ///登録ボタンが押されたときの処理///
  const handleSaveNewTask = (newTask) => {
    async function registerData() {
      const res = await fetch("http://localhost:3000/api/v1/tasks", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      console.log(data);
      setTasks([...tasks, data.data]);
      console.log(tasks);
      setIsAdding(false);//追加されたら新規追加行を非表示にする
    }
    registerData();
  };


  ///キャンセルボタンが押されたときの処理///
  const handleCancelNewTask = () => {
    setIsAdding(false);
  };


  ///編集⇒保存ボタンが押されたときの処理///
  const handleSaveUpdateTask = (id, updatedTask) => {
    async function updateData() {
      const res = await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (res.status >= 400) {
        alert("更新に失敗しました。");
        setTasks(tasks);
      } else {
        const data = await res.json();
        console.log(data);
        setTasks(
          tasks.map((task) => task.id === id ? data.data : task)
        );
      }
    }
    updateData();
  }


  ///削除ボタンが押されたときの処理///
  const handleDelete = (id) => {
    async function deleteData() {
      const tasksBeforeDelete = [...tasks];
      const res = await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
        method: "DELETE",
        mode: "cors",
      });
      if (res.status >= 400) {
        setTasks(tasksBeforeDelete);
        alert("削除に失敗しました。");

      } else {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    }
    deleteData();
  };





  //タスク一覧のコンポーネント（大枠）
  return (
    <div>
      <h1 className="text-base font-semibold leading-7 text-gray-900">
        タスク一覧
      </h1>
      <div>
        <div className="flex items-center space-x-4 mb-4">
          <input
            // name="taskSearchTitle"
            // id="taskSearchTitle"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 入力値を更新
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700">
            検索
          </button>
          <button
            onClick={handleAddNew}  //新規ボタンが押されるとhandleAddNewが呼ばれる
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            新規追加
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">タイトル</th>
                <th className="px-4 py-2">内容</th>
              </tr>
            </thead>
            <tbody>
              {isAdding && ( //新規追加ボタンが押されたときに表示される
                <NewTaskForm
                  onSave={handleSaveNewTask} //登録ボタンが押されると動く関数を渡してる　★★なんでここで渡してるんだっけ？setTasks使いたいから？
                  onCancel={handleCancelNewTask}//キャンセルボタンが押されると動く関数を渡してる
                />
              )}
              {tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onSave={handleSaveUpdateTask}
                  onDelete={handleDelete}
                />
              ))}

            </tbody>
          </table>
        )}


      </div>
    </div>
  );
}
