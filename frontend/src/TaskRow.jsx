import { useState } from 'react'

/**
 * 既存のタスクを表示・編集するためのコンポーネント
 * 編集モードと表示モードを切り替えながら、タスクの編集や削除を行う
 * @param {Object} props - コンポーネントに渡される props オブジェクト（
 * @param {Object} props.task - 表示するタスクオブジェクト
      { "id": 1,
        "title": "title_01",
        "description": "description_01-A",
        "created_at": "2024-08-26T02:22:06.413Z",
        "updated_at": "2024-08-26T02:30:18.184Z"
      } 
 * @param {Function} props.onSave - タスクを更新するための関数。`onSave(id, updatedTask)` の形式。
 * @param {Function} props.deleteHandler - タスクを削除するための関数。`deleteHandler(id)` の形式。
 * @returns {JSX.Element} タスク行の表示および編集UI。
 */
export default function TaskRow({ task, onSave, deleteHandler }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState(task.title);
  const [editTaskDescription, setEditTaskDescription] = useState(task.description);

  /**
   * 編集したタスクのデータを保存する
   * 保存ボタンが押されたときに `onSave` 関数を呼び出し、編集モードを終了する
   */
  const saveHandler = () => {
    onSave(task.id, { title: editTaskTitle, description: editTaskDescription });//ここで関数を実行している
    setIsEditing(false);//編集状態を解除する
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          <span className="block py-1.5 text-gray-900 shadow-sm  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            {task.title}
          </span>
        )}
      </td>
      <td className="flex justify-center">
        {isEditing ? (
          <input
            type="text"
            value={editTaskDescription}
            onChange={(e) => setEditTaskDescription(e.target.value)}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          <span className="block py-1.5 text-gray-900 shadow-sm  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            {task.description}
          </span>
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button
              onClick={saveHandler}//保存ボタンが押されるとsaveHandlerが呼ばれる(ここでは関数の実行はしていない)
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              保存
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              キャンセル
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              編集
            </button>
            <button
              onClick={() => deleteHandler(task.id)}//削除ボタンが押されるとdeleteHandlerが呼ばれる(ここで関数を実行している)
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              削除
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
