import React, { useState } from 'react';
import '../styles/inbox.css';

// Типізація даних
interface Message {
    id: number;
    text: string;
    time: string;
    isMine: boolean;
}

interface Chat {
    id: number;
    name: string;
    status: string;
    unread: number;
    messages: Message[];
}

interface Channel {
    id: string;
    name: string;
    totalUnread: number;
    icon: string;
    iconColor: string;
    chats: Chat[];
}

const Inbox: React.FC = () => {
    // Імітація бази даних повідомлень
    const [channels] = useState<Channel[]>([
        {
            id: 'telegram',
            name: 'Telegram',
            totalUnread: 12,
            icon: 'fa-telegram',
            iconColor: '#3b82f6',
            chats: [
                {
                    id: 1, name: 'Іван Петров', status: 'Онлайн', unread: 2, messages: [
                        { id: 1, text: 'Добрий день! Мені потрібна консультація щодо ваших послуг.', time: '14:30', isMine: false },
                        { id: 2, text: 'Звичайно! Розкажіть, що вас цікавить?', time: '14:32', isMine: true },
                        { id: 3, text: 'Мені потрібен детальний розрахунок вартості для мого проекту.', time: '14:35', isMine: false }
                    ]
                },
                {
                    id: 2, name: 'Олена Ткач', status: 'Була нещодавно', unread: 0, messages: [
                        { id: 1, text: 'Дякую, документи отримала.', time: 'Вчора', isMine: false }
                    ]
                }
            ]
        },
        {
            id: 'whatsapp',
            name: 'WhatsApp',
            totalUnread: 8,
            icon: 'fa-whatsapp',
            iconColor: '#22c55e',
            chats: [
                {
                    id: 3, name: 'ТОВ БудЕксперт', status: 'Офлайн', unread: 5, messages: [
                        { id: 1, text: 'Коли очікувати поставку?', time: '09:15', isMine: false }
                    ]
                }
            ]
        },
        {
            id: 'viber',
            name: 'Viber',
            totalUnread: 5,
            icon: 'fa-viber',
            iconColor: '#a855f7',
            chats: []
        }
    ]);

    // Стани для активного каналу та чату
    const [activeChannelId, setActiveChannelId] = useState<string>('telegram');
    const [activeChatId, setActiveChatId] = useState<number>(1);
    const [messageInput, setMessageInput] = useState<string>('');

    // Знаходимо поточні активні дані
    const activeChannel = channels.find(c => c.id === activeChannelId);
    const activeChat = activeChannel?.chats.find(c => c.id === activeChatId);

    // Зміна каналу
    const handleChannelClick = (channelId: string) => {
        setActiveChannelId(channelId);
        // При перемиканні каналу автоматично відкриваємо перший чат у списку (якщо він є)
        const channel = channels.find(c => c.id === channelId);
        if (channel && channel.chats.length > 0) {
            setActiveChatId(channel.chats[0].id);
        } else {
            setActiveChatId(0); // Немає чатів
        }
    };

    return (
        <div className="inbox-container fade-in-card">

            {/* Ліва панель: Канали та Чати */}
            <div className="inbox-sidebar">
                <div className="inbox-header">
                    <div className="inbox-logo">
                        <i className="fa-solid fa-inbox"></i>
                    </div>
                    <div>
                        <h2>Inbox</h2>
                        <span>42 нових</span>
                    </div>
                </div>

                <div className="sidebar-section">
                    <h3 className="section-title">Канали</h3>
                    <div className="channels-list">
                        {channels.map(channel => (
                            <div
                                key={channel.id}
                                className={`channel-item ${activeChannelId === channel.id ? 'active' : ''}`}
                                onClick={() => handleChannelClick(channel.id)}
                            >
                                <div className="channel-icon" style={{ backgroundColor: `${channel.iconColor}15`, color: channel.iconColor }}>
                                    <i className={`fa-brands ${channel.icon}`}></i>
                                </div>
                                <div className="channel-info">
                                    <span className="channel-name">{channel.name}</span>
                                    <span className="channel-unread">{channel.totalUnread} нових</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Список чатів для вибраного каналу */}
                <div className="sidebar-section chats-section">
                    <h3 className="section-title">Чати ({activeChannel?.name})</h3>
                    <div className="chats-list">
                        {activeChannel?.chats.length === 0 ? (
                            <p className="no-chats">Немає активних чатів</p>
                        ) : (
                            activeChannel?.chats.map(chat => (
                                <div
                                    key={chat.id}
                                    className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`}
                                    onClick={() => setActiveChatId(chat.id)}
                                >
                                    <div className="chat-avatar">
                                        {chat.name.charAt(0)}
                                    </div>
                                    <div className="chat-info">
                                        <div className="chat-name-row">
                                            <span className="chat-name">{chat.name}</span>
                                            {chat.unread > 0 && <span className="chat-badge">{chat.unread}</span>}
                                        </div>
                                        <span className="chat-preview">
                                            {chat.messages[chat.messages.length - 1]?.text || 'Немає повідомлень'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Права панель: Вікно повідомлень */}
            <div className="inbox-chat-area">
                {activeChat ? (
                    <>
                        {/* Шапка чату */}
                        <div className="chat-header">
                            <div className="chat-user-info">
                                <div className="chat-avatar">{activeChat.name.charAt(0)}</div>
                                <div>
                                    <h3>{activeChat.name}</h3>
                                    <span>{activeChat.status}</span>
                                </div>
                            </div>
                            <div className="chat-actions">
                                <button className="icon-btn"><i className="fa-solid fa-phone"></i></button>
                                <button className="icon-btn"><i className="fa-solid fa-video"></i></button>
                            </div>
                        </div>

                        {/* Зона повідомлень */}
                        <div className="chat-messages">
                            {activeChat.messages.map(msg => (
                                <div key={msg.id} className={`message-wrapper ${msg.isMine ? 'mine' : 'theirs'}`}>
                                    {!msg.isMine && <div className="message-avatar">{activeChat.name.charAt(0)}</div>}
                                    <div className="message-content">
                                        <div className="message-bubble">
                                            <p>{msg.text}</p>
                                        </div>
                                        <span className="message-time">{msg.time}</span>
                                    </div>
                                    {msg.isMine && <div className="message-avatar mine-avatar"><i className="fa-solid fa-user"></i></div>}
                                </div>
                            ))}
                        </div>

                        {/* Введення повідомлення */}
                        <div className="chat-input-area">
                            <div className="input-wrapper">
                                <button className="attach-btn"><i className="fa-solid fa-paperclip"></i></button>
                                <input
                                    type="text"
                                    placeholder="Введіть повідомлення..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') setMessageInput(''); }}
                                />
                                <button className="emoji-btn"><i className="fa-regular fa-face-smile"></i></button>
                                <button className="send-btn" onClick={() => setMessageInput('')}><i className="fa-solid fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="empty-chat-state">
                        <div className="empty-icon"><i className="fa-regular fa-comments"></i></div>
                        <h3>Оберіть чат для початку спілкування</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;