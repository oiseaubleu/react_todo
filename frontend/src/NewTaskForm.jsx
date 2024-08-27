import { useState } from 'react'
/**
 * 新規タスクを登録するためのコンポーネント
 * @param {Object} props - コンポーネントに渡される props オブジェクト。
 * @param {Function} props.onSave - 新しいタスクを保存するための関数。`onSave(newTask)` の形式で呼ばれます。
 * @param {Function} props.onCancel - タスクの登録をキャンセルするための関数。
 * @returns {JSX.Element} 新規タスクの入力および保存UI。
 * 
 */
export default function NewTaskForm({ onSave, onCancel }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");


  return (
    <tr>
      <td>
        <input
          type="text"
          placeholder="タスクタイトル"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </td>
      <td className="flex justify-center">
        <input
          type="text"
          placeholder="タスク内容"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </td>
      <td>
        <button
          onClick={() => onSave({ title: newTaskTitle, description: newTaskDescription })}
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          登録
        </button>
        <button
          onClick={onCancel}
          className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          キャンセル
        </button>
      </td>
    </tr>
  );
}

