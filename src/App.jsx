import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
<<<<<<< HEAD
=======
import { v4 as uuidv4 } from 'uuid';
>>>>>>> a914c813 (Initial commit)
import './App.css';

const ItemTypes = {
  BLOCK: 'block',
};

<<<<<<< HEAD
// Компонент Tooltip для отображения кастомных подсказок
const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip-text">{text}</span>
    </div>
  );
};

// Функция для перевода типа блока на русский язык
const getBlockTypeName = (type) => {
  switch (type) {
    case 'trigger':
      return 'Триггер';
    case 'condition':
      return 'Условие';
    case 'action':
      return 'Действие';
    default:
      return type;
  }
};

// Начальная конфигурация для каждого типа блока
function defaultConfig(type) {
  if (type === 'trigger') return { event: 'registration' };
  if (type === 'condition')
    return {
      composite: false,
      // По умолчанию условие по сумме покупок
      conditionType: 'purchase_amount', // Возможные значения: purchase_amount, purchase_count, category, point_of_sale, product
      operator: '>',
      value: 1000,       // Сумма покупок для purchase_amount
      count: 1,          // Количество покупок для purchase_count
      category: '',
      // Новое поле для конкретного товара
      product: '',
      pointOfSale: '',
      logicOperator: 'AND',
      subconditions: [
        { conditionType: 'purchase_amount', operator: '>', value: 1000, count: 1, category: '', product: '', pointOfSale: '' },
        { conditionType: 'purchase_amount', operator: '>', value: 1000, count: 1, category: '', product: '', pointOfSale: '' }
=======
const Tooltip = ({ text, children }) => (
  <div className="tooltip-container">
    {children}
    <span className="tooltip-text">{text}</span>
  </div>
);

const getBlockTypeName = (type) => {
  switch (type) {
    case 'trigger': return 'Триггер';
    case 'condition': return 'Условие';
    case 'action': return 'Действие';
    case 'communication': return 'Коммуникация';
    default: return type;
  }
};

function defaultConfig(type) {
  if (type === 'trigger')
    return {
      event: 'registration', // Можно задать "time_based" для временного триггера
      status: '',
      dayOfWeek: [], // теперь массив для выбора нескольких дней
      time: ''
    };
  if (type === 'condition')
    return {
      composite: false,
      conditionType: 'purchase_amount', // Возможные: purchase_amount, purchase_count, category, product, point_of_sale, region, vip_status
      operator: '>',
      value: 1000,
      count: 1,
      category: '',
      product: '',
      pointOfSale: '',
      region: '',
      vip: false,
      logicOperator: 'AND',
      subconditions: [
        { conditionType: 'purchase_amount', operator: '>', value: 1000, count: 1, category: '', product: '', pointOfSale: '', region: '', vip: false },
        { conditionType: 'purchase_amount', operator: '>', value: 1000, count: 1, category: '', product: '', pointOfSale: '', region: '', vip: false }
>>>>>>> a914c813 (Initial commit)
      ]
    };
  if (type === 'action')
    return {
      action: 'bonus',
      bonusAmount: 100,
      discountValue: 10,
      discountType: 'fixed',
      couponCode: '',
      notificationTemplate: '',
      newStatus: '',
      apiUrl: '',
      validityPeriod: 0,
      delay: 0,
      repeat: false,
      repeatInterval: 0,
      repeatCount: 0,
      tagName: ''
    };
<<<<<<< HEAD
  return {};
}

// Функция для генерации краткой сводки настроек блока (на русском языке)
=======
  if (type === 'communication')
    return {
      channel: 'email', // Возможные: email, sms, push
      subject: '',
      message: ''
    };
  return {};
}

>>>>>>> a914c813 (Initial commit)
const getBlockSummary = ({ data }) => {
  if (!data || !data.config) return "";
  const { type, config } = data;
  switch (type) {
    case "trigger":
      return `Событие: ${
<<<<<<< HEAD
        config.event === "registration"
          ? "Регистрация"
          : config.event === "purchase"
          ? "Покупка"
          : config.event === "login"
          ? "Вход"
          : config.event === "birthday"
          ? "День рождения"
          : config.event === "abandoned_cart"
          ? "Брошенная корзина"
          : config.event === "referral"
          ? "Реферальный"
          : config.event === "site_activity"
          ? "Активность на сайте"
          : config.event === "review"
          ? "Отзыв/Оценка"
          : config.event === "seasonal"
          ? "Сезонный/Промо"
          : config.event === "nth_day"
          ? `Наступил ${config.day} день`
          : config.event
      }`;
    case "condition":
      if (!config.composite) {
        if (config.conditionType === "purchase_amount") {
          return `Сумма покупок ${config.operator} ${config.value}`;
        } else if (config.conditionType === "purchase_count") {
          return `Количество покупок ${config.operator} ${config.count}`;
        } else if (config.conditionType === "category") {
          return `Категория ${config.operator}: ${config.category}`;
        } else if (config.conditionType === "product") {
          return `Конкретный товар ${config.operator}: ${config.product}`;
        } else if (config.conditionType === "point_of_sale") {
          return `Точка продаж ${config.operator}: ${config.pointOfSale}`;
        }
        return "";
      } else {
        const sub1 = config.subconditions[0];
        const sub2 = config.subconditions[1];
        const summary1 =
          sub1.conditionType === "purchase_amount"
            ? `Сумма покупок ${sub1.operator} ${sub1.value}`
            : sub1.conditionType === "purchase_count"
            ? `Количество покупок ${sub1.operator} ${sub1.count}`
            : sub1.conditionType === "category"
            ? `Категория ${sub1.operator}: ${sub1.category}`
            : sub1.conditionType === "product"
            ? `Конкретный товар ${sub1.operator}: ${sub1.product}`
            : sub1.conditionType === "point_of_sale"
            ? `Точка продаж ${sub1.operator}: ${sub1.pointOfSale}`
            : "";
        const summary2 =
          sub2.conditionType === "purchase_amount"
            ? `Сумма покупок ${sub2.operator} ${sub2.value}`
            : sub2.conditionType === "purchase_count"
            ? `Количество покупок ${sub2.operator} ${sub2.count}`
            : sub2.conditionType === "category"
            ? `Категория ${sub2.operator}: ${sub2.category}`
            : sub2.conditionType === "product"
            ? `Конкретный товар ${sub2.operator}: ${sub2.product}`
            : sub2.conditionType === "point_of_sale"
            ? `Точка продаж ${sub2.operator}: ${sub2.pointOfSale}`
            : "";
        return `(${summary1} ${config.logicOperator === "AND" ? "И" : "ИЛИ"} ${summary2})`;
      }
    case "action":
      if (config.action === "bonus") {
        return `Начисление бонусов: ${config.bonusAmount}`;
      } else if (config.action === "coupon") {
        return `Купон: ${config.couponCode}`;
      } else if (config.action === "discount") {
        return `Скидка: ${config.discountType === "fixed" ? config.discountValue : config.discountValue + "%"}`;
      } else if (config.action === "notification") {
        return `Уведомление: ${config.notificationTemplate}`;
      } else if (config.action === "status_change") {
        return `Изменение статуса: ${config.newStatus}`;
      } else if (config.action === "external_api") {
        return `Вызов API: ${config.apiUrl}`;
      } else if (config.action === "set_tag") {
        return `Установить метку: ${config.tagName}`;
      }
      return "";
    default:
      return "";
=======
        config.event === "registration" ? "Регистрация" :
        config.event === "purchase" ? "Покупка" :
        config.event === "login" ? "Вход" :
        config.event === "birthday" ? "День рождения" :
        config.event === "abandoned_cart" ? "Брошенная корзина" :
        config.event === "referral" ? "Реферальный" :
        config.event === "site_activity" ? "Активность на сайте" :
        config.event === "review" ? "Отзыв/Оценка" :
        config.event === "seasonal" ? "Сезонный/Промо" :
        config.event === "time_based" ? `Время: ${config.dayOfWeek.join(', ')} ${config.time}` :
        config.event === "nth_day" ? `Наступил ${config.day} день` :
        config.event === "status_update" ? `Обновление статуса: ${config.status}` :
        config.event
      }`;
    case "condition":
      if (!config.composite) {
        switch (config.conditionType) {
          case "purchase_amount": return `Сумма покупок ${config.operator} ${config.value}`;
          case "purchase_count": return `Количество покупок ${config.operator} ${config.count}`;
          case "category": return `Категория ${config.operator}: ${config.category}`;
          case "product": return `Конкретный товар ${config.operator}: ${config.product}`;
          case "point_of_sale": return `Точка продаж ${config.operator}: ${config.pointOfSale}`;
          case "region": return `Регион ${config.operator}: ${config.region}`;
          case "vip_status": return `VIP статус: ${config.vip ? "VIP" : "Не VIP"}`;
          default: return "";
        }
      } else {
        const [sub1, sub2] = config.subconditions;
        const getSubSummary = (sub) => {
          switch (sub.conditionType) {
            case "purchase_amount": return `Сумма покупок ${sub.operator} ${sub.value}`;
            case "purchase_count": return `Количество покупок ${sub.operator} ${sub.count}`;
            case "category": return `Категория ${sub.operator}: ${sub.category}`;
            case "product": return `Конкретный товар ${sub.operator}: ${sub.product}`;
            case "point_of_sale": return `Точка продаж ${sub.operator}: ${sub.pointOfSale}`;
            case "region": return `Регион ${sub.operator}: ${sub.region}`;
            case "vip_status": return `VIP статус: ${sub.vip ? "VIP" : "Не VIP"}`;
            default: return "";
          }
        };
        return `(${getSubSummary(sub1)} ${config.logicOperator === "AND" ? "И" : "ИЛИ"} ${getSubSummary(sub2)})`;
      }
    case "action":
      switch (config.action) {
        case "bonus": return `Начисление бонусов: ${config.bonusAmount}`;
        case "coupon": return `Купон: ${config.couponCode}`;
        case "discount": return `Скидка: ${config.discountType === "fixed" ? config.discountValue : config.discountValue + "%"}`;
        case "notification": return `Уведомление: ${config.notificationTemplate}`;
        case "status_change": return `Изменение статуса: ${config.newStatus}`;
        case "external_api": return `Вызов API: ${config.apiUrl}`;
        case "set_tag": return `Установить метку: ${config.tagName}`;
        default: return "";
      }
    case "communication":
      return `Коммуникация: ${config.channel}, Тема: ${config.subject}, Сообщение: ${config.message}`;
    default: return "";
  }
};

const evaluateSimpleCondition = (simpleConfig, eventData) => {
  switch (simpleConfig.conditionType) {
    case 'purchase_amount': {
      const { operator, value } = simpleConfig;
      const eventValue = eventData.amount;
      switch (operator) {
        case '>': return eventValue > value;
        case '>=': return eventValue >= value;
        case '<': return eventValue < value;
        case '<=': return eventValue <= value;
        case '==': return eventValue === value;
        case '!=': return eventValue !== value;
        default: return false;
      }
    }
    case 'purchase_count': {
      const { operator, count } = simpleConfig;
      const eventValue = eventData.count;
      switch (operator) {
        case '>': return eventValue > count;
        case '>=': return eventValue >= count;
        case '<': return eventValue < count;
        case '<=': return eventValue <= count;
        case '==': return eventValue === count;
        case '!=': return eventValue !== count;
        default: return false;
      }
    }
    case 'category': {
      return simpleConfig.operator === 'содержит'
        ? (eventData.category ? eventData.category.includes(simpleConfig.category) : false)
        : (simpleConfig.operator === 'полностью совпадает' ? eventData.category === simpleConfig.category : false);
    }
    case 'product': {
      return simpleConfig.operator === 'содержит'
        ? (eventData.product ? eventData.product.includes(simpleConfig.product) : false)
        : (simpleConfig.operator === 'полностью совпадает' ? eventData.product === simpleConfig.product : false);
    }
    case 'point_of_sale': {
      return simpleConfig.operator === 'содержит'
        ? (eventData.pointOfSale ? eventData.pointOfSale.includes(simpleConfig.pointOfSale) : false)
        : (simpleConfig.operator === 'полностью совпадает' ? eventData.pointOfSale === simpleConfig.pointOfSale : false);
    }
    case 'region': {
      return simpleConfig.operator === 'содержит'
        ? (eventData.region ? eventData.region.includes(simpleConfig.region) : false)
        : (simpleConfig.operator === 'полностью совпадает' ? eventData.region === simpleConfig.region : false);
    }
    case 'vip_status': {
      return eventData.vip === simpleConfig.vip;
    }
    case 'purchase_frequency': {
      const { operator, frequency } = simpleConfig;
      const eventValue = eventData.frequency;
      switch (operator) {
        case '>': return eventValue > frequency;
        case '>=': return eventValue >= frequency;
        case '<': return eventValue < frequency;
        case '<=': return eventValue <= frequency;
        case '==': return eventValue === frequency;
        case '!=': return eventValue !== frequency;
        default: return false;
      }
    }
    default:
      return false;
  }
};

const evaluateCondition = (config, eventData) => {
  if (config.composite) {
    const results = config.subconditions.map(sc => evaluateSimpleCondition(sc, eventData));
    return config.logicOperator === 'AND' ? results.every(r => r) : results.some(r => r);
  } else {
    return evaluateSimpleCondition(config, eventData);
  }
};

const executeAction = (config, eventData) => {
  if (config.channel !== undefined) {
    return `Отправлено через ${config.channel}: [${config.subject}] ${config.message}`;
  }
  switch (config.action) {
    case 'bonus': return `Начислено бонусов: ${config.bonusAmount}`;
    case 'set_tag': return `Метка установлена: ${config.tagName}`;
    case 'status_change': return `Изменение статуса: ${config.newStatus}`;
    default: return 'Действие выполнено';
>>>>>>> a914c813 (Initial commit)
  }
};

const ToolbarItem = ({ type, label, tooltip }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: { type, label },
<<<<<<< HEAD
    collect: monitor => ({ isDragging: monitor.isDragging() }),
=======
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
>>>>>>> a914c813 (Initial commit)
  }));
  return (
    <Tooltip text={tooltip}>
      <div ref={drag} className="toolbar-item" style={{ opacity: isDragging ? 0.5 : 1 }} title={tooltip}>
        {label}
      </div>
    </Tooltip>
  );
};

<<<<<<< HEAD
const CanvasBlock = ({ id, left, top, data, onSelect, onDelete, isSelected, validationError }) => {
  return (
    <div
      className={`canvas-block ${isSelected ? 'selected' : ''} ${validationError ? 'error' : ''}`}
      style={{ left, top }}
      onClick={() => onSelect(id)}
    >
      <div className="block-header">
        <strong>{data.label || getBlockTypeName(data.type)}</strong>
        <button className="delete-button" onClick={e => { e.stopPropagation(); onDelete(id); }}>
          &times;
        </button>
      </div>
      <div className="block-type">{getBlockTypeName(data.type)}</div>
      <div className="block-summary" title={getBlockSummary({ data })}>
        {getBlockSummary({ data })}
      </div>
    </div>
  );
};

const ConnectionsOverlay = ({ connections, blocks }) => {
  return (
    <svg className="connections-overlay">
      {connections.map((conn, index) => {
        const source = blocks.find(b => b.id === conn.sourceId);
        const target = blocks.find(b => b.id === conn.targetId);
        if (!source || !target) return null;
        const sourceX = source.left + 60;
        const sourceY = source.top + 30;
        const targetX = target.left + 60;
        const targetY = target.top + 30;
        return (
          <line
            key={index}
            x1={sourceX}
            y1={sourceY}
            x2={targetX}
            y2={targetY}
            stroke="#3498db"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
        );
      })}
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#3498db" />
        </marker>
      </defs>
    </svg>
  );
};

const Canvas = ({
  blocks,
  setBlocks,
  connections,
  selectedBlockId,
  handleBlockClick,
  validationErrors,
  onDeleteBlock,
  updateSelectedBlockId
}) => {
=======
const CanvasBlock = ({ id, left, top, data, onSelect, onDelete, isSelected, validationError }) => (
  <div
    className={`canvas-block ${isSelected ? 'selected' : ''} ${validationError ? 'error' : ''}`}
    style={{ left, top }}
    onClick={() => onSelect(id)}
  >
    <div className="block-header">
      <strong>{data.label || getBlockTypeName(data.type)}</strong>
      <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(id); }}>
        &times;
      </button>
    </div>
    <div className="block-type">{getBlockTypeName(data.type)}</div>
    <div className="block-summary" title={getBlockSummary({ data })}>
      {getBlockSummary({ data })}
    </div>
  </div>
);

const ConnectionsOverlay = ({ connections, blocks }) => (
  <svg className="connections-overlay">
    {connections.map((conn, index) => {
      const source = blocks.find((b) => b.id === conn.sourceId);
      const target = blocks.find((b) => b.id === conn.targetId);
      if (!source || !target) return null;
      const sourceX = source.left + 60;
      const sourceY = source.top + 30;
      const targetX = target.left + 60;
      const targetY = target.top + 30;
      return (
        <line
          key={index}
          x1={sourceX}
          y1={sourceY}
          x2={targetX}
          y2={targetY}
          stroke="#3498db"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
      );
    })}
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#3498db" />
      </marker>
    </defs>
  </svg>
);

const Canvas = ({ blocks, setBlocks, connections, selectedBlockId, handleBlockClick, validationErrors, onDeleteBlock, updateSelectedBlockId }) => {
>>>>>>> a914c813 (Initial commit)
  const gridSize = 20;
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = document.getElementById('canvas').getBoundingClientRect();
      const left = Math.round((offset.x - canvasRect.left) / gridSize) * gridSize;
      const top = Math.round((offset.y - canvasRect.top) / gridSize) * gridSize;
<<<<<<< HEAD
      const id = Date.now();
      const newBlock = { id, left, top, data: { ...item, config: defaultConfig(item.type) } };
      setBlocks(prev => [...prev, newBlock]);
      if (selectedBlockId) {
        setConnections(prev => [...prev, { sourceId: selectedBlockId, targetId: newBlock.id }]);
        if (updateSelectedBlockId) {
          updateSelectedBlockId(newBlock.id);
        }
=======
      const id = uuidv4();
      const newBlock = { id, left, top, data: { ...item, config: defaultConfig(item.type) } };
      setBlocks((prev) => [...prev, newBlock]);
      if (selectedBlockId) {
        setConnections((prev) => [...prev, { sourceId: selectedBlockId, targetId: newBlock.id }]);
        if (updateSelectedBlockId) updateSelectedBlockId(newBlock.id);
>>>>>>> a914c813 (Initial commit)
      }
    },
  }));

  return (
    <div id="canvas" ref={drop} className="canvas">
      <ConnectionsOverlay connections={connections} blocks={blocks} />
<<<<<<< HEAD
      {blocks.map(block => (
=======
      {blocks.map((block) => (
>>>>>>> a914c813 (Initial commit)
        <CanvasBlock
          key={block.id}
          {...block}
          onSelect={handleBlockClick}
          onDelete={onDeleteBlock}
          isSelected={block.id === selectedBlockId}
          validationError={validationErrors.includes(block.id)}
        />
      ))}
    </div>
  );
};

<<<<<<< HEAD
const SidePanel = ({ selectedBlock, updateBlock, startConnection, connectingSource, onAddNextBlock }) => {
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (selectedBlock) setLabel(selectedBlock.data.label || selectedBlock.data.type);
  }, [selectedBlock]);

=======
const SidePanel = ({
  selectedBlock,
  updateBlock,
  startConnection,
  connectingSource,
  onAddNextBlock,
  blocks,
  connections,
  saveState,
  setSelectedBlockId
}) => {
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (selectedBlock) {
      setLabel(selectedBlock.data.label || selectedBlock.data.type);
    }
  }, [selectedBlock]);

  const handleSubconditionChange = (index, field, value) => {
    const newSubconditions = selectedBlock.data.config.subconditions.map((sub, i) =>
      i === index ? { ...sub, [field]: value } : sub
    );
    const newConfig = { ...selectedBlock.data.config, subconditions: newSubconditions };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };

>>>>>>> a914c813 (Initial commit)
  if (!selectedBlock) {
    return (
      <div className="side-panel empty">
        <p>Выберите блок на холсте, чтобы настроить его свойства.</p>
      </div>
    );
  }

  const handleSave = () => {
    updateBlock(selectedBlock.id, { ...selectedBlock.data, label });
  };

<<<<<<< HEAD
  // Обработчики для блока-триггера
  const handleTriggerTypeChange = e => {
=======
  const handleTriggerTypeChange = (e) => {
>>>>>>> a914c813 (Initial commit)
    const newValue = e.target.value;
    const newConfig = newValue === 'nth_day'
      ? { ...selectedBlock.data.config, event: newValue, day: selectedBlock.data.config.day || 1 }
      : { ...selectedBlock.data.config, event: newValue };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };

<<<<<<< HEAD
  const renderNthDayField = () => {
    if (selectedBlock.data.config.event === 'nth_day') {
      return (
=======
  // Функция для выбора нескольких дней недели
  const handleDayOfWeekChange = (e) => {
    const options = e.target.options;
    let values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    const newConfig = { ...selectedBlock.data.config, dayOfWeek: values };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };

  const renderNthDayField = () =>
    selectedBlock.data.config.event === 'nth_day'
      ? (
>>>>>>> a914c813 (Initial commit)
        <div className="form-group" title="Введите номер дня, например 7 для 7-го дня">
          <label>Номер дня:</label>
          <input
            type="number"
            value={selectedBlock.data.config.day}
<<<<<<< HEAD
            onChange={e => {
=======
            onChange={(e) => {
>>>>>>> a914c813 (Initial commit)
              const newConfig = { ...selectedBlock.data.config, day: parseInt(e.target.value, 10) || 1 };
              updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
            }}
          />
        </div>
<<<<<<< HEAD
      );
    }
    return null;
  };

  // Обработчики для блока-условия
  const handleConditionTypeChange = e => {
    const newConfig = { ...selectedBlock.data.config, conditionType: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleOperatorChange = e => {
    const newConfig = { ...selectedBlock.data.config, operator: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleValueChange = e => {
    const newConfig = { ...selectedBlock.data.config, value: parseFloat(e.target.value) };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  // Новый обработчик для количества покупок (purchase_count)
  const handleCountChange = e => {
    const newConfig = { ...selectedBlock.data.config, count: parseInt(e.target.value, 10) };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleCategoryChange = e => {
    const newConfig = { ...selectedBlock.data.config, category: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  // Новый обработчик для конкретного товара (product)
  const handleProductChange = e => {
    const newConfig = { ...selectedBlock.data.config, product: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handlePOSChange = e => {
    const newConfig = { ...selectedBlock.data.config, pointOfSale: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleCompositeToggle = e => {
    const newConfig = { ...selectedBlock.data.config, composite: e.target.checked };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleLogicOperatorChange = e => {
    const newConfig = { ...selectedBlock.data.config, logicOperator: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleSubconditionChange = (index, field, value) => {
    const newSubconditions = selectedBlock.data.config.subconditions.map((sub, i) =>
      i === index ? { ...sub, [field]: value } : sub
    );
    const newConfig = { ...selectedBlock.data.config, subconditions: newSubconditions };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };

  // Обработчики для блока-действия
  const handleActionTypeChange = e => {
    const newConfig = { ...selectedBlock.data.config, action: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleBonusAmountChange = e => {
    const newConfig = { ...selectedBlock.data.config, bonusAmount: parseFloat(e.target.value) };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleCouponCodeChange = e => {
    const newConfig = { ...selectedBlock.data.config, couponCode: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleDiscountTypeChange = e => {
    const newConfig = { ...selectedBlock.data.config, discountType: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleDiscountValueChange = e => {
    const newConfig = { ...selectedBlock.data.config, discountValue: parseFloat(e.target.value) };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleNotificationTemplateChange = e => {
    const newConfig = { ...selectedBlock.data.config, notificationTemplate: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  // Обновлён обработчик для изменения статуса — теперь используется select
  const handleNewStatusChange = e => {
    const newConfig = { ...selectedBlock.data.config, newStatus: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleApiUrlChange = e => {
    const newConfig = { ...selectedBlock.data.config, apiUrl: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleValidityPeriodChange = e => {
    const newConfig = { ...selectedBlock.data.config, validityPeriod: parseInt(e.target.value, 10) };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleDelayChange = e => {
    const newConfig = { ...selectedBlock.data.config, delay: parseInt(e.target.value, 10) };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleRepeatToggle = e => {
    const newConfig = { ...selectedBlock.data.config, repeat: e.target.checked };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleRepeatIntervalChange = e => {
    const newConfig = { ...selectedBlock.data.config, repeatInterval: parseInt(e.target.value, 10) };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleRepeatCountChange = e => {
    const newConfig = { ...selectedBlock.data.config, repeatCount: parseInt(e.target.value, 10) };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
  const handleTagNameChange = e => {
    const newConfig = { ...selectedBlock.data.config, tagName: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
=======
      )
      : null;

  const renderTriggerStatusField = () =>
    selectedBlock.data.config.event === 'status_update'
      ? (
        <div className="form-group" title="Выберите статус, при изменении которого будет запускаться цепочка">
          <label>Статус для триггера:</label>
          <select
            value={selectedBlock.data.config.status}
            onChange={(e) => {
              const newConfig = { ...selectedBlock.data.config, status: e.target.value };
              updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
            }}
          >
            <option value="">-- Выберите статус --</option>
            <option value="new">Новый</option>
            <option value="active">Активный</option>
            <option value="vip">VIP</option>
            <option value="inactive">Неактивный</option>
          </select>
        </div>
      )
      : null;

  // Обновлённое поле для выбора нескольких дней недели
  const renderTimeBasedFields = () =>
    selectedBlock.data.config.event === 'time_based'
      ? (
        <>
          <div className="form-group" title="Выберите дни недели">
            <label>Дни недели:</label>
            <select
              multiple
              value={selectedBlock.data.config.dayOfWeek}
              onChange={handleDayOfWeekChange}
              size={3}
            >
              <option value="monday">Понедельник</option>
              <option value="tuesday">Вторник</option>
              <option value="wednesday">Среда</option>
              <option value="thursday">Четверг</option>
              <option value="friday">Пятница</option>
              <option value="saturday">Суббота</option>
              <option value="sunday">Воскресенье</option>
            </select>
          </div>
          <div className="form-group" title="Выберите время">
            <label>Время:</label>
            <input
              type="time"
              value={selectedBlock.data.config.time}
              onChange={(e) => {
                const newConfig = { ...selectedBlock.data.config, time: e.target.value };
                updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
              }}
            />
          </div>
        </>
      )
      : null;

  const handleChannelChange = (e) => {
    const newConfig = { ...selectedBlock.data.config, channel: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };

  const handleSubjectChange = (e) => {
    const newConfig = { ...selectedBlock.data.config, subject: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };

  const handleMessageChange = (e) => {
    const newConfig = { ...selectedBlock.data.config, message: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };

  const handleActionTypeChange = (e) => {
    const newConfig = { ...selectedBlock.data.config, action: e.target.value };
    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
  };
>>>>>>> a914c813 (Initial commit)

  return (
    <div className="side-panel">
      <Tooltip text="Настройте свойства выбранного блока">
        <h3>Настройки блока</h3>
      </Tooltip>
      <div className="form-group">
        <Tooltip text="Введите название блока (если не задано, будет использовано значение по умолчанию)">
          <label>Название:</label>
        </Tooltip>
<<<<<<< HEAD
        <input type="text" value={label} onChange={e => setLabel(e.target.value)} />
      </div>
      {selectedBlock.data.type === 'trigger' && (
        <>
          <div className="form-group">
            <Tooltip text="Выберите тип триггера для запуска цепочки">
              <label>Тип триггера:</label>
            </Tooltip>
            <select value={selectedBlock.data.config.event} onChange={handleTriggerTypeChange}>
              <option value="registration">Регистрация</option>
              <option value="purchase">Покупка</option>
              <option value="login">Вход</option>
              <option value="birthday">День рождения</option>
              <option value="abandoned_cart">Брошенная корзина</option>
              <option value="referral">Реферальный</option>
              <option value="site_activity">Активность на сайте</option>
              <option value="review">Отзыв/Оценка</option>
              <option value="seasonal">Сезонный/Промо</option>
              <option value="nth_day">Наступил N день</option>
            </select>
          </div>
          {selectedBlock.data.config.event === 'nth_day' && renderNthDayField()}
        </>
      )}
      {selectedBlock.data.type === 'condition' && (
        <>
          <div className="form-group">
            <Tooltip text="Отметьте, если условие состоит из двух подусловий">
              <label>Составное условие:</label>
            </Tooltip>
            <input type="checkbox" checked={selectedBlock.data.config.composite} onChange={handleCompositeToggle} /> (если включено – комбинируются два условия)
          </div>
          {!selectedBlock.data.config.composite ? (
            <>
              <div className="form-group">
                <Tooltip text="Выберите тип условия">
                  <label>Тип условия:</label>
                </Tooltip>
                <select value={selectedBlock.data.config.conditionType} onChange={handleConditionTypeChange}>
                  <option value="purchase_amount">Сумма покупок</option>
                  <option value="purchase_count">Количество покупок</option>
                  <option value="category">Категория товаров</option>
                  <option value="product">Конкретный товар</option>
                  <option value="point_of_sale">Точка продаж</option>
                </select>
              </div>
              {selectedBlock.data.config.conditionType === 'purchase_amount' && (
                <div className="form-group">
                  <Tooltip text="Задайте сумму покупок для условия">
                    <label>Сумма покупок:</label>
                  </Tooltip>
                  <input type="number" value={selectedBlock.data.config.value} onChange={handleValueChange} />
                </div>
              )}
              {selectedBlock.data.config.conditionType === 'purchase_count' && (
                <div className="form-group">
                  <Tooltip text="Задайте количество покупок для условия">
                    <label>Количество покупок:</label>
                  </Tooltip>
                  <input type="number" value={selectedBlock.data.config.count} onChange={handleCountChange} />
                </div>
              )}
              {selectedBlock.data.config.conditionType === 'category' && (
                <div className="form-group">
                  <Tooltip text="Выберите оператор и введите название категории">
                    <label>Оператор:</label>
                  </Tooltip>
                  <select value={selectedBlock.data.config.operator} onChange={handleOperatorChange}>
                    <option value="содержит">Содержит</option>
                    <option value="полностью совпадает">Полностью совпадает</option>
                  </select>
                  <label>Категория товаров:</label>
                  <input type="text" value={selectedBlock.data.config.category} onChange={handleCategoryChange} />
                </div>
              )}
              {selectedBlock.data.config.conditionType === 'product' && (
                <div className="form-group">
                  <Tooltip text="Выберите оператор и введите название товара">
                    <label>Конкретный товар:</label>
                  </Tooltip>
                  <select value={selectedBlock.data.config.operator} onChange={handleOperatorChange}>
                    <option value="содержит">Содержит</option>
                    <option value="полностью совпадает">Полностью совпадает</option>
                  </select>
                  <input type="text" value={selectedBlock.data.config.product} onChange={handleProductChange} placeholder="Название товара" />
                </div>
              )}
              {selectedBlock.data.config.conditionType === 'point_of_sale' && (
                <div className="form-group">
                  <Tooltip text="Выберите оператор и укажите точку продаж">
                    <label>Оператор:</label>
                  </Tooltip>
                  <select value={selectedBlock.data.config.operator} onChange={handleOperatorChange}>
                    <option value="содержит">Содержит</option>
                    <option value="полностью совпадает">Полностью совпадает</option>
                  </select>
                  <label>Точка продаж:</label>
                  <input type="text" value={selectedBlock.data.config.pointOfSale} onChange={handlePOSChange} />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="form-group">
                <Tooltip text="Выберите логический оператор для комбинирования условий">
                  <label>Логический оператор:</label>
                </Tooltip>
                <select value={selectedBlock.data.config.logicOperator} onChange={handleLogicOperatorChange}>
                  <option value="AND">И</option>
                  <option value="OR">ИЛИ</option>
                </select>
              </div>
              {[0, 1].map(index => (
                <div key={index} className="composite-condition">
                  <h4>Подусловие {index + 1}:</h4>
                  <div className="form-group">
                    <Tooltip text="Выберите тип подусловия">
                      <label>Тип условия:</label>
                    </Tooltip>
                    <select
                      value={selectedBlock.data.config.subconditions[index].conditionType}
                      onChange={e => handleSubconditionChange(index, 'conditionType', e.target.value)}
                    >
                      <option value="purchase_amount">Сумма покупок</option>
                      <option value="purchase_count">Количество покупок</option>
                      <option value="category">Категория товаров</option>
                      <option value="product">Конкретный товар</option>
                      <option value="point_of_sale">Точка продаж</option>
                    </select>
                  </div>
                  {selectedBlock.data.config.subconditions[index].conditionType === 'purchase_amount' && (
                    <div className="form-group">
                      <Tooltip text="Задайте сумму покупок для подусловия">
                        <label>Сумма покупок:</label>
                      </Tooltip>
                      <input
                        type="number"
                        value={selectedBlock.data.config.subconditions[index].value}
                        onChange={e => handleSubconditionChange(index, 'value', parseFloat(e.target.value))}
                      />
                    </div>
                  )}
                  {selectedBlock.data.config.subconditions[index].conditionType === 'purchase_count' && (
                    <div className="form-group">
                      <Tooltip text="Задайте количество покупок для подусловия">
                        <label>Количество покупок:</label>
                      </Tooltip>
                      <input
                        type="number"
                        value={selectedBlock.data.config.subconditions[index].count}
                        onChange={e => handleSubconditionChange(index, 'count', parseInt(e.target.value, 10))}
                      />
                    </div>
                  )}
                  {selectedBlock.data.config.subconditions[index].conditionType === 'category' && (
                    <div className="form-group">
                      <Tooltip text="Выберите оператор и введите название категории для подусловия">
                        <label>Оператор:</label>
                      </Tooltip>
                      <select
                        value={selectedBlock.data.config.subconditions[index].operator}
                        onChange={e => handleSubconditionChange(index, 'operator', e.target.value)}
                      >
                        <option value="содержит">Содержит</option>
                        <option value="полностью совпадает">Полностью совпадает</option>
                      </select>
                      <label>Категория товаров:</label>
                      <input
                        type="text"
                        value={selectedBlock.data.config.subconditions[index].category}
                        onChange={e => handleSubconditionChange(index, 'category', e.target.value)}
                      />
                    </div>
                  )}
                  {selectedBlock.data.config.subconditions[index].conditionType === 'product' && (
                    <div className="form-group">
                      <Tooltip text="Выберите оператор и введите название товара для подусловия">
                        <label>Конкретный товар:</label>
                      </Tooltip>
                      <select
                        value={selectedBlock.data.config.subconditions[index].operator}
                        onChange={e => handleSubconditionChange(index, 'operator', e.target.value)}
                      >
                        <option value="содержит">Содержит</option>
                        <option value="полностью совпадает">Полностью совпадает</option>
                      </select>
                      <input
                        type="text"
                        value={selectedBlock.data.config.subconditions[index].product}
                        onChange={e => handleSubconditionChange(index, 'product', e.target.value)}
                        placeholder="Название товара"
                      />
                    </div>
                  )}
                  {selectedBlock.data.config.subconditions[index].conditionType === 'point_of_sale' && (
                    <div className="form-group">
                      <Tooltip text="Выберите оператор и укажите точку продаж для подусловия">
                        <label>Оператор:</label>
                      </Tooltip>
                      <select
                        value={selectedBlock.data.config.subconditions[index].operator}
                        onChange={e => handleSubconditionChange(index, 'operator', e.target.value)}
                      >
                        <option value="содержит">Содержит</option>
                        <option value="полностью совпадает">Полностью совпадает</option>
                      </select>
                      <label>Точка продаж:</label>
                      <input
                        type="text"
                        value={selectedBlock.data.config.subconditions[index].pointOfSale}
                        onChange={e => handleSubconditionChange(index, 'pointOfSale', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </>
      )}
      {selectedBlock.data.type === 'action' && (
        <>
          <div className="form-group">
            <Tooltip text="Выберите тип действия для выполнения">
              <label>Тип действия:</label>
            </Tooltip>
            <select value={selectedBlock.data.config.action} onChange={handleActionTypeChange}>
              <option value="bonus">Начисление бонусов</option>
              <option value="coupon">Выдача купона</option>
              <option value="discount">Предоставление скидки</option>
              <option value="notification">Уведомление/Email</option>
              <option value="status_change">Изменение статуса</option>
              <option value="external_api">Вызов внешнего API</option>
              <option value="set_tag">Установить метку</option>
            </select>
          </div>
          {selectedBlock.data.config.action === 'bonus' && (
            <div className="form-group">
              <Tooltip text="Введите сумму бонусов">
                <label>Сумма бонусов:</label>
              </Tooltip>
              <input type="number" value={selectedBlock.data.config.bonusAmount} onChange={handleBonusAmountChange} />
            </div>
          )}
          {selectedBlock.data.config.action === 'coupon' && (
            <div className="form-group">
              <Tooltip text="Введите код купона">
                <label>Код купона:</label>
              </Tooltip>
              <input type="text" value={selectedBlock.data.config.couponCode} onChange={handleCouponCodeChange} />
            </div>
          )}
          {selectedBlock.data.config.action === 'discount' && (
            <>
              <div className="form-group">
                <Tooltip text="Выберите тип скидки">
                  <label>Тип скидки:</label>
                </Tooltip>
                <select value={selectedBlock.data.config.discountType} onChange={handleDiscountTypeChange}>
                  <option value="fixed">Фиксированная</option>
                  <option value="percentage">Процентная</option>
                </select>
              </div>
              <div className="form-group">
                <Tooltip text="Введите размер скидки">
                  <label>Размер скидки:</label>
                </Tooltip>
                <input type="number" value={selectedBlock.data.config.discountValue} onChange={handleDiscountValueChange} />
              </div>
            </>
          )}
          {selectedBlock.data.config.action === 'notification' && (
            <div className="form-group">
              <Tooltip text="Введите шаблон уведомления">
                <label>Шаблон уведомления:</label>
              </Tooltip>
              <input type="text" value={selectedBlock.data.config.notificationTemplate} onChange={handleNotificationTemplateChange} />
            </div>
          )}
          {selectedBlock.data.config.action === 'status_change' && (
            <div className="form-group">
              <Tooltip text="Выберите новый статус покупателя">
                <label>Новый статус:</label>
              </Tooltip>
              <select value={selectedBlock.data.config.newStatus} onChange={handleNewStatusChange}>
                <option value="">-- Выберите статус --</option>
                <option value="new">Новый</option>
                <option value="active">Активный</option>
                <option value="vip">VIP</option>
                <option value="inactive">Неактивный</option>
              </select>
            </div>
          )}
          {selectedBlock.data.config.action === 'external_api' && (
            <div className="form-group">
              <Tooltip text="Введите URL для API вызова">
                <label>URL API:</label>
              </Tooltip>
              <input type="text" value={selectedBlock.data.config.apiUrl} onChange={handleApiUrlChange} />
            </div>
          )}
          {selectedBlock.data.config.action === 'set_tag' && (
            <div className="form-group">
              <Tooltip text="Введите метку для аккаунта">
                <label>Метка:</label>
              </Tooltip>
              <input
                type="text"
                value={selectedBlock.data.config.tagName}
                onChange={handleTagNameChange}
                placeholder="Введите метку"
              />
            </div>
          )}
          <div className="form-group">
            <Tooltip text="Введите срок действия в днях">
              <label>Срок действия (дни):</label>
            </Tooltip>
            <input type="number" value={selectedBlock.data.config.validityPeriod} onChange={handleValidityPeriodChange} />
          </div>
          <div className="form-group">
            <Tooltip text="Введите задержку перед выполнением (в часах)">
              <label>Задержка (часов):</label>
            </Tooltip>
            <input type="number" value={selectedBlock.data.config.delay} onChange={handleDelayChange} />
          </div>
          <div className="form-group">
            <Tooltip text="Отметьте, если действие должно повторяться">
              <label>Повторять действие:</label>
            </Tooltip>
            <input type="checkbox" checked={selectedBlock.data.config.repeat} onChange={handleRepeatToggle} />
          </div>
          {selectedBlock.data.config.repeat && (
            <>
              <div className="form-group">
                <Tooltip text="Введите интервал повторения (в часах)">
                  <label>Интервал повторения (часов):</label>
                </Tooltip>
                <input type="number" value={selectedBlock.data.config.repeatInterval} onChange={handleRepeatIntervalChange} />
              </div>
              <div className="form-group">
                <Tooltip text="Введите количество повторов">
                  <label>Количество повторов:</label>
                </Tooltip>
                <input type="number" value={selectedBlock.data.config.repeatCount} onChange={handleRepeatCountChange} />
              </div>
            </>
          )}
        </>
      )}
      <Tooltip text="Сохранить изменения в блоке">
        <button className="save-button" onClick={handleSave}>Сохранить</button>
      </Tooltip>
      <Tooltip text="Добавить следующий блок (если возможно)">
        <button className="add-next-button" onClick={() => onAddNextBlock()}>
          Добавить следующий блок
        </button>
      </Tooltip>
      <p>Конфигурация: {JSON.stringify(selectedBlock.data.config)}</p>
      <Tooltip text="Начать соединение выбранного блока с другим">
        <button className="connect-button" onClick={() => startConnection(selectedBlock.id)}>
          Начать соединение {connectingSource === selectedBlock.id && "(Исходный блок)"}
        </button>
      </Tooltip>
=======
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
      </div>
      {selectedBlock.data.type === 'trigger'
        ? (
          <>
            <div className="form-group">
              <Tooltip text="Выберите тип триггера для запуска цепочки">
                <label>Тип триггера:</label>
              </Tooltip>
              <select value={selectedBlock.data.config.event} onChange={handleTriggerTypeChange}>
                <option value="registration">Регистрация</option>
                <option value="purchase">Покупка</option>
                <option value="login">Вход</option>
                <option value="birthday">День рождения</option>
                <option value="abandoned_cart">Брошенная корзина</option>
                <option value="referral">Реферальный</option>
                <option value="site_activity">Активность на сайте</option>
                <option value="review">Отзыв/Оценка</option>
                <option value="seasonal">Сезонный/Промо</option>
                <option value="nth_day">Наступил N день</option>
                <option value="status_update">Обновление статуса</option>
                <option value="time_based">Временной триггер</option>
              </select>
            </div>
            {selectedBlock.data.config.event === 'nth_day' ? renderNthDayField() : null}
            {selectedBlock.data.config.event === 'status_update' ? renderTriggerStatusField() : null}
            {selectedBlock.data.config.event === 'time_based' ? renderTimeBasedFields() : null}
          </>
        )
        : selectedBlock.data.type === 'condition'
          ? (
            <>
              <div className="form-group">
                <Tooltip text="Отметьте, если условие состоит из двух подусловий">
                  <label>Составное условие:</label>
                </Tooltip>
                <input
                  type="checkbox"
                  checked={selectedBlock.data.config.composite}
                  onChange={(e) => {
                    const newConfig = { ...selectedBlock.data.config, composite: e.target.checked };
                    updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                  }}
                /> (если включено – комбинируются два условия)
              </div>
              {!selectedBlock.data.config.composite
                ? (
                  <>
                    <div className="form-group">
                      <Tooltip text="Выберите тип условия">
                        <label>Тип условия:</label>
                      </Tooltip>
                      <select value={selectedBlock.data.config.conditionType} onChange={(e) => {
                        const newConfig = { ...selectedBlock.data.config, conditionType: e.target.value };
                        updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                      }}>
                        <option value="purchase_amount">Сумма покупок</option>
                        <option value="purchase_count">Количество покупок</option>
                        <option value="category">Категория товаров</option>
                        <option value="product">Конкретный товар</option>
                        <option value="point_of_sale">Точка продаж</option>
                        <option value="region">Регион</option>
                        <option value="vip_status">VIP статус</option>
                      </select>
                    </div>
                    {selectedBlock.data.config.conditionType === 'purchase_amount'
                      ? (
                        <div className="form-group">
                          <Tooltip text="Задайте сумму покупок для условия">
                            <label>Сумма покупок:</label>
                          </Tooltip>
                          <input
                            type="number"
                            value={selectedBlock.data.config.value}
                            onChange={(e) => {
                              const newConfig = { ...selectedBlock.data.config, value: parseFloat(e.target.value) };
                              updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                            }}
                          />
                        </div>
                      ) : null}
                    {selectedBlock.data.config.conditionType === 'purchase_count'
                      ? (
                        <div className="form-group">
                          <Tooltip text="Задайте количество покупок для условия">
                            <label>Количество покупок:</label>
                          </Tooltip>
                          <input
                            type="number"
                            value={selectedBlock.data.config.count}
                            onChange={(e) => {
                              const newConfig = { ...selectedBlock.data.config, count: parseInt(e.target.value, 10) };
                              updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                            }}
                          />
                        </div>
                      ) : null}
                    {selectedBlock.data.config.conditionType === 'category'
                      ? (
                        <div className="form-group">
                          <Tooltip text="Выберите оператор и введите название категории">
                            <label>Оператор:</label>
                          </Tooltip>
                          <select value={selectedBlock.data.config.operator} onChange={(e) => {
                            const newConfig = { ...selectedBlock.data.config, operator: e.target.value };
                            updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                          }}>
                            <option value="содержит">Содержит</option>
                            <option value="полностью совпадает">Полностью совпадает</option>
                          </select>
                          <label>Категория товаров:</label>
                          <input
                            type="text"
                            value={selectedBlock.data.config.category}
                            onChange={(e) => {
                              const newConfig = { ...selectedBlock.data.config, category: e.target.value };
                              updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                            }}
                          />
                        </div>
                      ) : null}
                    {selectedBlock.data.config.conditionType === 'product'
                      ? (
                        <div className="form-group">
                          <Tooltip text="Выберите оператор и введите название товара">
                            <label>Конкретный товар:</label>
                          </Tooltip>
                          <select value={selectedBlock.data.config.operator} onChange={(e) => {
                            const newConfig = { ...selectedBlock.data.config, operator: e.target.value };
                            updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                          }}>
                            <option value="содержит">Содержит</option>
                            <option value="полностью совпадает">Полностью совпадает</option>
                          </select>
                          <input
                            type="text"
                            value={selectedBlock.data.config.product}
                            onChange={(e) => {
                              const newConfig = { ...selectedBlock.data.config, product: e.target.value };
                              updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                            }}
                            placeholder="Название товара"
                          />
                        </div>
                      ) : null}
                    {selectedBlock.data.config.conditionType === 'point_of_sale'
                      ? (
                        <div className="form-group">
                          <Tooltip text="Выберите оператор и укажите точку продаж">
                            <label>Оператор:</label>
                          </Tooltip>
                          <select value={selectedBlock.data.config.operator} onChange={(e) => {
                            const newConfig = { ...selectedBlock.data.config, operator: e.target.value };
                            updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                          }}>
                            <option value="содержит">Содержит</option>
                            <option value="полностью совпадает">Полностью совпадает</option>
                          </select>
                          <label>Точка продаж:</label>
                          <input
                            type="text"
                            value={selectedBlock.data.config.pointOfSale}
                            onChange={(e) => {
                              const newConfig = { ...selectedBlock.data.config, pointOfSale: e.target.value };
                              updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                            }}
                          />
                        </div>
                      ) : null}
                    {selectedBlock.data.config.conditionType === 'region'
                      ? (
                        <div className="form-group">
                          <Tooltip text="Выберите оператор и введите название региона">
                            <label>Регион:</label>
                          </Tooltip>
                          <select value={selectedBlock.data.config.operator} onChange={(e) => {
                            const newConfig = { ...selectedBlock.data.config, operator: e.target.value };
                            updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                          }}>
                            <option value="содержит">Содержит</option>
                            <option value="полностью совпадает">Полностью совпадает</option>
                          </select>
                          <input
                            type="text"
                            value={selectedBlock.data.config.region}
                            onChange={(e) => {
                              const newConfig = { ...selectedBlock.data.config, region: e.target.value };
                              updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                            }}
                            placeholder="Название региона"
                          />
                        </div>
                      ) : null}
                    {selectedBlock.data.config.conditionType === 'vip_status'
                      ? (
                        <div className="form-group">
                          <Tooltip text="Выберите значение для VIP статуса">
                            <label>VIP статус:</label>
                          </Tooltip>
                          <select value={selectedBlock.data.config.vip ? "true" : "false"} onChange={(e) => {
                            const newConfig = { ...selectedBlock.data.config, vip: e.target.value === "true" };
                            updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                          }}>
                            <option value="true">VIP</option>
                            <option value="false">Неактивный</option>
                          </select>
                        </div>
                      ) : null}
                  </>
                ) : null}
            </>
          )
          : selectedBlock.data.type === 'action'
            ? (
              <>
                <div className="form-group">
                  <Tooltip text="Выберите тип действия для выполнения">
                    <label>Тип действия:</label>
                  </Tooltip>
                  <select value={selectedBlock.data.config.action} onChange={handleActionTypeChange}>
                    <option value="bonus">Начисление бонусов</option>
                    <option value="coupon">Выдача купона</option>
                    <option value="discount">Предоставление скидки</option>
                    <option value="notification">Уведомление/Email</option>
                    <option value="status_change">Изменение статуса</option>
                    <option value="external_api">Вызов внешнего API</option>
                    <option value="set_tag">Установить метку</option>
                  </select>
                </div>
                {selectedBlock.data.config.action === 'bonus'
                  ? (
                    <div className="form-group">
                      <Tooltip text="Введите сумму бонусов">
                        <label>Сумма бонусов:</label>
                      </Tooltip>
                      <input type="number" value={selectedBlock.data.config.bonusAmount} onChange={(e) => {
                        const newConfig = { ...selectedBlock.data.config, bonusAmount: parseFloat(e.target.value) };
                        updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                      }} />
                    </div>
                  ) : null}
                {selectedBlock.data.config.action === 'coupon'
                  ? (
                    <div className="form-group">
                      <Tooltip text="Введите код купона">
                        <label>Код купона:</label>
                      </Tooltip>
                      <input type="text" value={selectedBlock.data.config.couponCode} onChange={(e) => {
                        const newConfig = { ...selectedBlock.data.config, couponCode: e.target.value };
                        updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                      }} />
                    </div>
                  ) : null}
                {selectedBlock.data.config.action === 'discount'
                  ? (
                    <>
                      <div className="form-group">
                        <Tooltip text="Выберите тип скидки">
                          <label>Тип скидки:</label>
                        </Tooltip>
                        <select value={selectedBlock.data.config.discountType} onChange={(e) => {
                          const newConfig = { ...selectedBlock.data.config, discountType: e.target.value };
                          updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                        }}>
                          <option value="fixed">Фиксированная</option>
                          <option value="percentage">Процентная</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <Tooltip text="Введите размер скидки">
                          <label>Размер скидки:</label>
                        </Tooltip>
                        <input type="number" value={selectedBlock.data.config.discountValue} onChange={(e) => {
                          const newConfig = { ...selectedBlock.data.config, discountValue: parseFloat(e.target.value) };
                          updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                        }} />
                      </div>
                    </>
                  ) : null}
                {selectedBlock.data.config.action === 'notification'
                  ? (
                    <div className="form-group">
                      <Tooltip text="Введите шаблон уведомления">
                        <label>Шаблон уведомления:</label>
                      </Tooltip>
                      <input type="text" value={selectedBlock.data.config.notificationTemplate} onChange={(e) => {
                        const newConfig = { ...selectedBlock.data.config, notificationTemplate: e.target.value };
                        updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                      }} />
                    </div>
                  ) : null}
                {selectedBlock.data.config.action === 'status_change'
                  ? (
                    <div className="form-group">
                      <Tooltip text="Выберите новый статус покупателя">
                        <label>Новый статус:</label>
                      </Tooltip>
                      <select value={selectedBlock.data.config.newStatus} onChange={(e) => {
                        const newConfig = { ...selectedBlock.data.config, newStatus: e.target.value };
                        updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                      }}>
                        <option value="">-- Выберите статус --</option>
                        <option value="new">Новый</option>
                        <option value="active">Активный</option>
                        <option value="vip">VIP</option>
                        <option value="inactive">Неактивный</option>
                      </select>
                    </div>
                  ) : null}
                {selectedBlock.data.config.action === 'external_api'
                  ? (
                    <div className="form-group">
                      <Tooltip text="Введите URL для API вызова">
                        <label>URL API:</label>
                      </Tooltip>
                      <input type="text" value={selectedBlock.data.config.apiUrl} onChange={(e) => {
                        const newConfig = { ...selectedBlock.data.config, apiUrl: e.target.value };
                        updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                      }} />
                    </div>
                  ) : null}
                {selectedBlock.data.config.action === 'set_tag'
                  ? (
                    <div className="form-group">
                      <Tooltip text="Введите метку для аккаунта">
                        <label>Метка:</label>
                      </Tooltip>
                      <input type="text" value={selectedBlock.data.config.tagName} onChange={(e) => {
                        const newConfig = { ...selectedBlock.data.config, tagName: e.target.value };
                        updateBlock(selectedBlock.id, { ...selectedBlock.data, config: newConfig });
                      }} placeholder="Введите метку" />
                    </div>
                  ) : null}
              </>
            )
            : selectedBlock.data.type === 'communication'
              ? (
                <>
                  <div className="form-group">
                    <Tooltip text="Выберите канал коммуникации (email, sms, push)">
                      <label>Канал:</label>
                    </Tooltip>
                    <select value={selectedBlock.data.config.channel} onChange={handleChannelChange}>
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="push">Push</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <Tooltip text="Введите тему сообщения">
                      <label>Тема:</label>
                    </Tooltip>
                    <input type="text" value={selectedBlock.data.config.subject || ''} onChange={handleSubjectChange} />
                  </div>
                  <div className="form-group">
                    <Tooltip text="Введите текст сообщения">
                      <label>Сообщение:</label>
                    </Tooltip>
                    <textarea value={selectedBlock.data.config.message} onChange={handleMessageChange} />
                  </div>
                </>
              )
              : null}
      <Tooltip text="Добавить следующий блок">
        <button className="add-next-button" onClick={onAddNextBlock}>
          Добавить следующий блок
        </button>
      </Tooltip>
      <Tooltip text="Сохранить изменения в блоке">
        <button className="save-button" onClick={handleSave}>
          Сохранить
        </button>
      </Tooltip>
      <Tooltip text="Начать соединение выбранного блока с другим">
        <button className="connect-button" onClick={() => startConnection(selectedBlock.id)}>
          Начать соединение {connectingSource === selectedBlock.id ? "(Исходный блок)" : ""}
        </button>
      </Tooltip>
      <p>Конфигурация: {JSON.stringify(selectedBlock.data.config)}</p>
>>>>>>> a914c813 (Initial commit)
    </div>
  );
};

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [connectingSource, setConnectingSource] = useState(null);
  const [simulationLog, setSimulationLog] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const saveState = (newBlocks, newConnections) => {
<<<<<<< HEAD
    setUndoStack(prev => [...prev, { blocks, connections }]);
=======
    setUndoStack((prev) => [...prev, { blocks, connections }]);
>>>>>>> a914c813 (Initial commit)
    setRedoStack([]);
    setBlocks(newBlocks);
    setConnections(newConnections);
  };

<<<<<<< HEAD
  const handleBlockClick = blockId => {
    if (connectingSource && connectingSource !== blockId) {
      const sourceBlock = blocks.find(b => b.id === connectingSource);
      const targetBlock = blocks.find(b => b.id === blockId);
=======
  const handleBlockClick = (blockId) => {
    if (connectingSource && connectingSource !== blockId) {
      const sourceBlock = blocks.find((b) => b.id === connectingSource);
      const targetBlock = blocks.find((b) => b.id === blockId);
>>>>>>> a914c813 (Initial commit)
      if (sourceBlock && targetBlock &&
          sourceBlock.data.type === 'trigger' &&
          targetBlock.data.type === 'action') {
        alert('Нельзя соединить триггер напрямую с действием. Добавьте условие между ними.');
        return;
      }
      if (sourceBlock && targetBlock &&
          sourceBlock.data.type === 'action' &&
          targetBlock.data.type === 'trigger') {
        alert('Нельзя соединять действие с исходным триггером.');
        return;
      }
      const newConnections = [...connections, { sourceId: connectingSource, targetId: blockId }];
<<<<<<< HEAD
      setSimulationLog(prev => [...prev, `Создана связь от ${connectingSource} к ${blockId}`]);
=======
      setSimulationLog((prev) => [...prev, `Создана связь от ${connectingSource} к ${blockId}`]);
>>>>>>> a914c813 (Initial commit)
      setConnectingSource(null);
      saveState([...blocks], [...newConnections]);
    } else {
      setSelectedBlockId(blockId);
    }
  };

  const updateBlock = (id, newData) => {
<<<<<<< HEAD
    const newBlocks = blocks.map(block => (block.id === id ? { ...block, data: newData } : block));
    saveState(newBlocks, connections);
  };

  const startConnection = blockId => {
    setConnectingSource(blockId);
    setSimulationLog(prev => [...prev, `Начато создание связи от блока ${blockId}. Выберите целевой блок.`]);
  };

  const onDeleteBlock = id => {
    const newBlocks = blocks.filter(b => b.id !== id);
    const newConnections = connections.filter(conn => conn.sourceId !== id && conn.targetId !== id);
=======
    const newBlocks = blocks.map((block) =>
      block.id === id ? { ...block, data: newData } : block
    );
    saveState(newBlocks, connections);
  };

  const startConnection = (blockId) => {
    setConnectingSource(blockId);
    setSimulationLog((prev) => [...prev, `Начато создание связи от блока ${blockId}. Выберите целевой блок.`]);
  };

  const onDeleteBlock = (id) => {
    const newBlocks = blocks.filter((b) => b.id !== id);
    const newConnections = connections.filter(
      (conn) => conn.sourceId !== id && conn.targetId !== id
    );
>>>>>>> a914c813 (Initial commit)
    saveState(newBlocks, newConnections);
  };

  const validateChain = () => {
    let errors = [];
    let visited = new Set();
<<<<<<< HEAD
    const triggers = blocks.filter(b => b.data.type === 'trigger');
    if (triggers.length === 0) {
      errors.push('Цепочка должна начинаться с триггера.');
    }
    triggers.forEach(trigger => {
=======
    const triggers = blocks.filter((b) => b.data.type === 'trigger');
    if (triggers.length === 0) {
      errors.push('Цепочка должна начинаться с триггера.');
    }
    triggers.forEach((trigger) => {
>>>>>>> a914c813 (Initial commit)
      let currentBlock = trigger;
      visited.clear();
      while (currentBlock && !visited.has(currentBlock.id)) {
        visited.add(currentBlock.id);
<<<<<<< HEAD
        if (currentBlock.data.type === 'action') break;
        const conn = connections.find(conn => conn.sourceId === currentBlock.id);
=======
        if (currentBlock.data.type === 'action' || currentBlock.data.type === 'communication')
          break;
        const conn = connections.find((conn) => conn.sourceId === currentBlock.id);
>>>>>>> a914c813 (Initial commit)
        if (!conn) {
          errors.push(`Блок ${currentBlock.id} не имеет исходящей связи.`);
          break;
        }
<<<<<<< HEAD
        currentBlock = blocks.find(b => b.id === conn.targetId);
=======
        currentBlock = blocks.find((b) => b.id === conn.targetId);
>>>>>>> a914c813 (Initial commit)
      }
      if (currentBlock && visited.has(currentBlock.id)) {
        errors.push(`Обнаружен цикл в цепочке, начиная с блока ${trigger.id}.`);
      }
    });
    setValidationErrors(errors);
    return errors;
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const lastState = undoStack[undoStack.length - 1];
<<<<<<< HEAD
    setRedoStack(prev => [...prev, { blocks, connections }]);
    setUndoStack(prev => prev.slice(0, prev.length - 1));
=======
    setRedoStack((prev) => [...prev, { blocks, connections }]);
    setUndoStack((prev) => prev.slice(0, prev.length - 1));
>>>>>>> a914c813 (Initial commit)
    setBlocks(lastState.blocks);
    setConnections(lastState.connections);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
<<<<<<< HEAD
    setUndoStack(prev => [...prev, { blocks, connections }]);
    setRedoStack(prev => prev.slice(0, prev.length - 1));
=======
    setUndoStack((prev) => [...prev, { blocks, connections }]);
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
>>>>>>> a914c813 (Initial commit)
    setBlocks(nextState.blocks);
    setConnections(nextState.connections);
  };

  const handleExport = () => {
    const data = JSON.stringify({ blocks, connections }, null, 2);
    alert(`Экспорт:\n${data}`);
  };

  const handleImport = () => {
    const data = prompt('Вставьте JSON конфигурацию:');
    try {
      const parsed = JSON.parse(data);
      saveState(parsed.blocks, parsed.connections);
<<<<<<< HEAD
      setSimulationLog(prev => [...prev, 'Конфигурация успешно импортирована.']);
=======
      setSimulationLog((prev) => [...prev, 'Конфигурация успешно импортирована.']);
>>>>>>> a914c813 (Initial commit)
    } catch (e) {
      alert('Неверный формат JSON');
    }
  };

  const handleAddNextBlock = () => {
<<<<<<< HEAD
    if (!selectedBlockId) return;
    const currentBlock = blocks.find(b => b.id === selectedBlockId);
    if (!currentBlock) return;
    
    let newType;
    if (currentBlock.data.type === "trigger") {
      newType = "condition";
    } else if (currentBlock.data.type === "condition") {
      newType = "action";
    } else {
      alert("Из блока типа 'действие' нельзя добавить следующий блок.");
      return;
    }
    
    const newLeft = currentBlock.left + 200;
    const newTop = currentBlock.top;
    const id = Date.now();
    const newBlock = { 
      id, 
      left: newLeft, 
      top: newTop, 
      data: { type: newType, label: '', config: defaultConfig(newType) } 
    };
    const newBlocksArray = [...blocks, newBlock];
    const newConnectionsArray = [...connections, { sourceId: selectedBlockId, targetId: newBlock.id }];
    saveState(newBlocksArray, newConnectionsArray);
    setSelectedBlockId(newBlock.id);
=======
    try {
      if (!selectedBlockId) return;
      const currentBlock = blocks.find((b) => b.id === selectedBlockId);
      if (!currentBlock) return;

      let newType;
      if (currentBlock.data.type === "trigger") {
        newType = "condition";
      } else if (currentBlock.data.type === "condition") {
        newType = "action";
      } else if (currentBlock.data.type === "action") {
        newType = "communication";
      } else if (currentBlock.data.type === "communication") {
        alert("Блок коммуникации можно добавить только после блока действия.");
        return;
      }

      console.log("Текущий блок:", currentBlock);
      const newLeft = currentBlock.left + 200;
      const newTop = currentBlock.top;
      const id = uuidv4();
      const newBlock = {
        id,
        left: newLeft,
        top: newTop,
        data: { type: newType, label: '', config: defaultConfig(newType) }
      };
      console.log("Создаётся новый блок:", newBlock);
      const newBlocksArray = [...blocks, newBlock];
      const newConnection =
        currentBlock.data.type === 'condition'
          ? { sourceId: selectedBlockId, targetId: newBlock.id, branch: 'true' }
          : { sourceId: selectedBlockId, targetId: newBlock.id };
      const newConnectionsArray = [...connections, newConnection];
      saveState(newBlocksArray, newConnectionsArray);
      setSelectedBlockId(newBlock.id);
    } catch (error) {
      console.error("Ошибка при добавлении следующего блока:", error);
    }
>>>>>>> a914c813 (Initial commit)
  };

  const simulateChain = () => {
    let logs = [];
    const eventData = {
<<<<<<< HEAD
      event: 'purchase',
      amount: 1500,
      // Для проверки нового условия добавляем count и product
      count: 3,
      product: 'Laptop',
      category: 'electronics',
      frequency: 3,
      pointOfSale: 'store1'
    };
    const triggers = blocks.filter(b => b.data.type === 'trigger' && b.data.config.event === eventData.event);
=======
      event: 'time_based', // Пример для временного триггера
      dayOfWeek: 'monday', // Предположим, что симуляция проходит для одного дня
      time: '08:00',
      amount: 0,
      count: 0,
      product: '',
      category: '',
      frequency: 0,
      pointOfSale: '',
      region: '',
      vip: false
    };
    const triggers = blocks.filter((b) => {
      if (b.data.type !== 'trigger') return false;
      if (b.data.config.event === 'time_based' && eventData.event === 'time_based') {
        // Проверяем, содержится ли выбранный день в массиве дней
        return b.data.config.dayOfWeek.includes(eventData.dayOfWeek) && eventData.time >= b.data.config.time;
      }
      return b.data.config.event === eventData.event;
    });
>>>>>>> a914c813 (Initial commit)
    if (triggers.length === 0) {
      logs.push(`Нет триггера для события ${eventData.event}`);
      setSimulationLog(logs);
      return;
    }
    const simulateBlock = (block, visited = new Set(), prefix = "") => {
      if (visited.has(block.id)) return [prefix + `Обнаружен цикл в блоке ${block.id}`];
      visited.add(block.id);
      let localLogs = [];
      if (block.data.type === 'trigger') {
        localLogs.push(prefix + `Триггер ${block.id} активирован`);
      } else if (block.data.type === 'condition') {
        const conditionPassed = evaluateCondition(block.data.config, eventData);
        localLogs.push(prefix + `Условие ${block.id} ${conditionPassed ? 'пройдено' : 'не пройдено'}`);
<<<<<<< HEAD
      } else if (block.data.type === 'action') {
        localLogs.push(prefix + `Выполнено действие ${block.id}: ${executeAction(block.data.config, eventData)}`);
      }
      const outConns = connections.filter(conn => conn.sourceId === block.id);
      if (outConns.length === 0) {
        localLogs.push(prefix + `Блок ${block.id} не имеет исходящих соединений.`);
      } else {
        outConns.forEach(conn => {
          const nextBlock = blocks.find(b => b.id === conn.targetId);
=======
        let outConns = connections.filter((conn) => conn.sourceId === block.id);
        const branchConns = outConns.filter((conn) => conn.branch);
        if (branchConns.length > 0) {
          outConns = outConns.filter((conn) => conn.branch === (conditionPassed ? 'true' : 'false'));
          if (outConns.length === 0) {
            outConns = branchConns;
          }
        }
        outConns.forEach((conn) => {
          const nextBlock = blocks.find((b) => b.id === conn.targetId);
>>>>>>> a914c813 (Initial commit)
          if (nextBlock) {
            localLogs.push(...simulateBlock(nextBlock, new Set(visited), prefix + "  "));
          }
        });
<<<<<<< HEAD
=======
      } else if (block.data.type === 'action') {
        localLogs.push(prefix + `Выполнено действие ${block.id}: ${executeAction(block.data.config, eventData)}`);
      } else if (block.data.type === 'communication') {
        localLogs.push(prefix + `Выполнена коммуникация ${block.id}: ${executeAction(block.data.config, eventData)}`);
      }
      if (connections.filter((conn) => conn.sourceId === block.id).length === 0) {
        localLogs.push(prefix + `Блок ${block.id} не имеет исходящих соединений.`);
>>>>>>> a914c813 (Initial commit)
      }
      return localLogs;
    };

<<<<<<< HEAD
    triggers.forEach(trigger => {
=======
    triggers.forEach((trigger) => {
>>>>>>> a914c813 (Initial commit)
      logs.push(`Запуск цепочки с триггера: ${trigger.id}`);
      logs.push(...simulateBlock(trigger));
    });
    setSimulationLog(logs);
  };

<<<<<<< HEAD
  const selectedBlock = blocks.find(b => b.id === selectedBlockId);
=======
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
>>>>>>> a914c813 (Initial commit)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <div className="toolbar">
          <Tooltip text="Панель инструментов. Здесь можно перетаскивать блоки">
            <h3>Панель инструментов</h3>
          </Tooltip>
          <ToolbarItem type="trigger" label="Триггер" tooltip="Перетащите сюда, чтобы создать триггер" />
          <ToolbarItem type="condition" label="Условие" tooltip="Перетащите сюда, чтобы добавить условие" />
          <ToolbarItem type="action" label="Действие" tooltip="Перетащите сюда, чтобы добавить действие" />
<<<<<<< HEAD
          <button className="simulate-button" onClick={simulateChain} title="Запустить симуляцию цепочки">Симулировать цепочку</button>
          <button className="simulate-button" onClick={validateChain} title="Проверить корректность цепочки">Валидировать цепочку</button>
          <button className="simulate-button" onClick={handleUndo} title="Отменить последнее действие">Отменить</button>
          <button className="simulate-button" onClick={handleRedo} title="Повторить последнее отменённое действие">Повторить</button>
          <button className="simulate-button" onClick={handleExport} title="Экспортировать конфигурацию в JSON">Экспорт</button>
          <button className="simulate-button" onClick={handleImport} title="Импортировать конфигурацию из JSON">Импорт</button>
=======
          <button className="simulate-button" onClick={simulateChain} title="Запустить симуляцию цепочки">
            Симулировать цепочку
          </button>
          <button className="simulate-button" onClick={validateChain} title="Проверить корректность цепочки">
            Валидировать цепочку
          </button>
          <button className="simulate-button" onClick={handleUndo} title="Отменить последнее действие">
            Отменить
          </button>
          <button className="simulate-button" onClick={handleRedo} title="Повторить последнее отменённое действие">
            Повторить
          </button>
          <button className="simulate-button" onClick={handleExport} title="Экспортировать конфигурацию в JSON">
            Экспорт
          </button>
          <button className="simulate-button" onClick={handleImport} title="Импортировать конфигурацию из JSON">
            Импорт
          </button>
>>>>>>> a914c813 (Initial commit)
        </div>
        <Canvas
          blocks={blocks}
          setBlocks={setBlocks}
          connections={connections}
          selectedBlockId={selectedBlockId}
          handleBlockClick={handleBlockClick}
          validationErrors={validationErrors}
          onDeleteBlock={onDeleteBlock}
          updateSelectedBlockId={setSelectedBlockId}
        />
        <SidePanel
          selectedBlock={selectedBlock}
          updateBlock={updateBlock}
          startConnection={startConnection}
          connectingSource={connectingSource}
          onAddNextBlock={handleAddNextBlock}
<<<<<<< HEAD
=======
          blocks={blocks}
          connections={connections}
          saveState={saveState}
          setSelectedBlockId={setSelectedBlockId}
>>>>>>> a914c813 (Initial commit)
        />
      </div>
      <Tooltip text="Здесь отображается лог симуляции и ошибок валидации">
        <div className="simulation-log">
          <h3>Лог симуляции и валидации</h3>
          <pre>{simulationLog.join('\n')}</pre>
<<<<<<< HEAD
          {validationErrors.length > 0 && (
=======
          {validationErrors.length > 0 ? (
>>>>>>> a914c813 (Initial commit)
            <div className="error-log">
              <h4>Ошибки валидации:</h4>
              <ul>
                {validationErrors.map((err, i) => (<li key={i}>{err}</li>))}
              </ul>
            </div>
<<<<<<< HEAD
          )}
=======
          ) : null}
>>>>>>> a914c813 (Initial commit)
        </div>
      </Tooltip>
    </DndProvider>
  );
};

<<<<<<< HEAD
// Функция проверки простого условия с поддержкой операторов "содержит" и "полностью совпадает"
const evaluateSimpleCondition = (simpleConfig, eventData) => {
  if (simpleConfig.conditionType === 'purchase_amount') {
    const op = simpleConfig.operator;
    const eventValue = eventData.amount;
    const condValue = simpleConfig.value;
    switch (op) {
      case '>': return eventValue > condValue;
      case '>=': return eventValue >= condValue;
      case '<': return eventValue < condValue;
      case '<=': return eventValue <= condValue;
      case '==': return eventValue == condValue;
      case '!=': return eventValue != condValue;
      default: return false;
    }
  } else if (simpleConfig.conditionType === 'purchase_count') {
    const op = simpleConfig.operator;
    const eventValue = eventData.count;
    const condValue = simpleConfig.count;
    switch (op) {
      case '>': return eventValue > condValue;
      case '>=': return eventValue >= condValue;
      case '<': return eventValue < condValue;
      case '<=': return eventValue <= condValue;
      case '==': return eventValue == condValue;
      case '!=': return eventValue != condValue;
      default: return false;
    }
  } else if (simpleConfig.conditionType === 'category') {
    if (simpleConfig.operator === 'содержит') {
      return eventData.category.includes(simpleConfig.category);
    } else if (simpleConfig.operator === 'полностью совпадает') {
      return eventData.category === simpleConfig.category;
    }
  } else if (simpleConfig.conditionType === 'product') {
    if (simpleConfig.operator === 'содержит') {
      return eventData.product.includes(simpleConfig.product);
    } else if (simpleConfig.operator === 'полностью совпадает') {
      return eventData.product === simpleConfig.product;
    }
  } else if (simpleConfig.conditionType === 'point_of_sale') {
    if (simpleConfig.operator === 'содержит') {
      return eventData.pointOfSale.includes(simpleConfig.pointOfSale);
    } else if (simpleConfig.operator === 'полностью совпадает') {
      return eventData.pointOfSale === simpleConfig.pointOfSale;
    }
  } else if (simpleConfig.conditionType === 'purchase_frequency') {
    const op = simpleConfig.operator;
    const eventValue = eventData.frequency;
    const condValue = simpleConfig.frequency;
    switch (op) {
      case '>': return eventValue > condValue;
      case '>=': return eventValue >= condValue;
      case '<': return eventValue < condValue;
      case '<=': return eventValue <= condValue;
      case '==': return eventValue == condValue;
      case '!=': return eventValue != condValue;
      default: return false;
    }
  }
  return false;
};

const evaluateCondition = (config, eventData) => {
  if (config.composite) {
    const results = config.subconditions.map(sc => evaluateSimpleCondition(sc, eventData));
    return config.logicOperator === 'AND' ? results.every(r => r) : results.some(r => r);
  } else {
    return evaluateSimpleCondition(config, eventData);
  }
};

const executeAction = (config, eventData) => {
  if (config.action === 'bonus')
    return `Начислено бонусов: ${config.bonusAmount}`;
  if (config.action === 'set_tag')
    return `Метка установлена: ${config.tagName}`;
  if (config.action === 'status_change')
    return `Изменение статуса: ${config.newStatus}`;
  return 'Действие выполнено';
};

=======
>>>>>>> a914c813 (Initial commit)
export default App;