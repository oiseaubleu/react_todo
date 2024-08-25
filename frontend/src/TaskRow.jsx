import { useState } from 'react'


/**
 * 既存のタスクを編集するためのコンポーネント
 * @param {*} param0 
 * @returns 
 */

export default function TaskRow({ task, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState(task.title);
  const [editTaskDescription, setEditTaskDescription] = useState(task.description);

  const handleSave = () => {
    onSave(task.id, { title: editTaskTitle, description: editTaskDescription });
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            // name="taskTitle"
            // id="taskTitle"
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
            // name="taskdescription"
            // id="taskdescription"
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
              onClick={handleSave}
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
              onClick={() => onDelete(task.id)}
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
