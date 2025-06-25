import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../css/admin_panel.css';

const AdminPanel = ({ isAuthenticated, user, setAuthenticated, setUser }) => {
  const [tables, setTables] = useState({});
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [newRow, setNewRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = useCallback(async () => {
    try {
      setLoading(true);
      const tablesList = ['agent', 'client', 'deal', 'house', 'review', 'status', 'type_house'];
      const viewsList = ['view1', 'view2', 'view3', 'view4', 'view5', 'view6', 'view7', 'view8', 'view9', 'view10'];
      const data = {};
      for (const table of [...tablesList, ...viewsList]) {
        const response = await axios.get(`http://majesticapi/getTable.php?table=${table}`);
        data[table] = response.data || []; // Устанавливаем пустой массив, если данные отсутствуют
        console.log(`Loaded ${table}:`, data[table]); // Отладка
      }
      setTables(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Не удалось загрузить данные. Проверь консоль для деталей.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = useCallback((table, row) => {
    setSelectedTable(table);
    const idKey = Object.keys(row).find(key => key.toLowerCase().includes('id')) || 'id';
    setEditRow({ ...row, id: row[idKey], idKey });
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!editRow || !Object.keys(editRow).length || !editRow.id) return;
    try {
      const response = await axios.put(`http://majesticapi/updateTable.php`, {
        table: selectedTable,
        data: editRow,
        idKey: editRow.idKey || 'id',
      });
      setEditRow(null);
      fetchTables();
    } catch (error) {
      setError('Не удалось сохранить изменения.');
    }
  }, [editRow, selectedTable, fetchTables]);

  const handleDelete = useCallback(async (table, id) => {
    if (window.confirm('Вы уверены, что хотите удалить запись?')) {
      try {
        const idKey = Object.keys(tables[table][0]).find(key => key.toLowerCase().includes('id')) || 'id';
        const response = await axios.delete(`http://majesticapi/deleteTable.php`, {
          data: { table, id, idKey },
        });
        fetchTables();
      } catch (error) {
        setError('Не удалось удалить запись.');
      }
    }
  }, [tables, fetchTables]);

  const handleAdd = useCallback(async () => {
    if (!newRow || !Object.keys(newRow).length) return;
    try {
      const response = await axios.post(`http://majesticapi/insertTable.php`, {
        table: selectedTable,
        data: newRow,
      });
      setNewRow({});
      fetchTables();
    } catch (error) {
      setError('Не удалось добавить запись.');
    }
  }, [newRow, selectedTable, fetchTables]);

  const handleLogout = async () => {
    try {
      await axios.get('http://majesticapi/login.php?logout=true');
      setAuthenticated(false);
      setUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  if (!isAuthenticated || !user || user.role !== 'Админ') {
    return <p className="error-message">Доступ запрещён. Только для админов!</p>;
  }

  if (loading) {
    return <p className="loading-message">Загрузка...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1 className="panel-title">Панель администратора</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Выйти
        </button>
      </div>

      {/* Блок для таблиц */}
      <div className="table-select">
        <h2>Управление таблицами</h2>
        <select
          onChange={(e) => setSelectedTable(e.target.value)}
          value={selectedTable || ''}
        >
          <option value="">Выберите таблицу</option>
          {['agent', 'client', 'deal', 'house', 'review', 'status', 'type_house'].map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </select>
      </div>
      {selectedTable && tables[selectedTable] && (
        <div className="table-container">
          <h2 className="table-title">{selectedTable}</h2>
          <table className="data-table">
            <thead>
              <tr>
                {Object.keys(tables[selectedTable][0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {tables[selectedTable].map((row) => {
                const idKey = Object.keys(row).find(key => key.toLowerCase().includes('id')) || 'id';
                return (
                  <tr key={row[idKey]}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                    <td>
                      <button onClick={() => handleEdit(selectedTable, row)} className="edit-btn">
                        Редактировать
                      </button>
                      <button onClick={() => handleDelete(selectedTable, row[idKey])} className="delete-btn">
                        Удалить
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {editRow && (
            <div className="edit-form">
              <h3 className="form-title__admin">Редактирование записи</h3>
              {Object.keys(editRow).map((key) => (
                <div key={key} className="form-group">
                  <label>{key}:</label>
                  <input
                    type="text"
                    value={editRow[key] || ''}
                    onChange={(e) => setEditRow({ ...editRow, [key]: e.target.value })}
                  />
                </div>
              ))}
              <button onClick={handleSaveEdit} className="save-btn">
                Сохранить
              </button>
              <button onClick={() => setEditRow(null)} className="cancel-btn">
                Отмена
              </button>
            </div>
          )}
          <div className="add-form">
            <h3 className="form-title__admin">Добавить запись</h3>
            {Object.keys(tables[selectedTable][0]).map((key) => (
              <div key={key} className="form-group">
                <label>{key}:</label>
                <input
                  type="text"
                  value={newRow[key] || ''}
                  onChange={(e) => setNewRow({ ...newRow, [key]: e.target.value })}
                />
              </div>
            ))}
            <button onClick={handleAdd} className="add-btn">
              Добавить
            </button>
          </div>
        </div>
      )}

      {/* Блок для представлений */}
      <div className="view-select">
        <h2>Просмотр представлений</h2>
        <select
          onChange={(e) => setSelectedView(e.target.value)}
          value={selectedView || ''}
        >
          <option value="">Выберите представление</option>
          {['view1', 'view2', 'view3', 'view4', 'view5', 'view6', 'view7', 'view8', 'view9', 'view10'].map((view) => (
            <option key={view} value={view}>
              {view}
            </option>
          ))}
        </select>
      </div>
      {selectedView && tables[selectedView] && (
        <div className="view-container">
          <h2 className="view-title">{selectedView}</h2>
          {tables[selectedView].length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  {Object.keys(tables[selectedView][0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tables[selectedView].map((row) => {
                  const idKey = Object.keys(row).find(key => key.toLowerCase().includes('id')) || 'id';
                  return (
                    <tr key={row[idKey]}>
                      {Object.values(row).map((value, index) => (
                        <td key={index}>{value !== null ? value : 'N/A'}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>Нет данных для отображения.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;