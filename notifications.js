/**
 * =====================================================
 * NOTIFICATION SYSTEM - Professional Modal & Toast Handler
 * =====================================================
 * 
 * Replaces all browser alert(), confirm(), and prompt() with:
 * - Modal dialogs for confirmations and errors (blocking)
 * - Toast notifications for success/info (non-blocking, auto-dismiss)
 * 
 * Uses existing CSS classes: .modal, .modal-content, .close-button
 * Color scheme: Green (.status-confirmed) = success, Red (.status-cancelled) = error, 
 *              Amber (.status-pending) = warning/info
 */

// =====================================================
// NOTIFICATION SYSTEM CONFIGURATION
// =====================================================

const NotificationConfig = {
    toastDuration: 4000,      // Toast auto-dismiss time (milliseconds)
    animationDuration: 300,   // Animation duration (milliseconds)
    maxToasts: 3,             // Maximum toasts visible at once
    soundEnabled: false       // Optional: enable notification sounds
};

// =====================================================
// TOAST NOTIFICATION SYSTEM (Non-blocking, Auto-dismiss)
// =====================================================

/**
 * Shows a toast notification (non-blocking, auto-dismisses)
 * Best for: Success confirmations, info messages, quick feedback
 * 
 * @param {string} message - The notification message
 * @param {string} type - 'success' (green), 'error' (red), 'info' (blue), 'warning' (amber)
 * @param {number} duration - Optional: override auto-dismiss duration (ms)
 */
function showToast(message, type = 'info', duration = NotificationConfig.toastDuration) {
    // Ensure toast container exists
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 3000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    // Enforce max toasts
    const existingToasts = container.querySelectorAll('.toast');
    if (existingToasts.length >= NotificationConfig.maxToasts) {
        existingToasts[0].remove();
    }

    // Determine color based on type
    const colorMap = {
        'success': '#2f8f2f',    // Deep green (confirmed)
        'error': '#d63b45',      // Red (cancelled)
        'warning': '#f4c542',    // Amber (pending)
        'info': '#1f7ed0'        // Rich blue (info / checked-in)
    };

    const backgroundColor = colorMap[type] || colorMap['info'];
    const icon = {
        'success': '✓',
        'error': '✕',
        'warning': '⚠',
        'info': 'ℹ'
    }[type] || 'ℹ';

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        background-color: ${backgroundColor};
        color: white;
        padding: 16px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        max-width: 400px;
        word-wrap: break-word;
        animation: slideInRight 0.3s ease-out;
        pointer-events: auto;
        font-weight: 500;
        font-size: 0.95rem;
    `;

    toast.innerHTML = `
        <span style="font-size: 1.3rem; font-weight: bold; flex-shrink: 0;">${icon}</span>
        <span style="flex: 1;">${message}</span>
        <button onclick="this.closest('.toast').remove()" style="
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
            padding: 0;
            line-height: 1;
            opacity: 0.8;
            transition: opacity 0.2s;
        " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
            ×
        </button>
    `;

    container.appendChild(toast);

    // Auto-dismiss after duration
    const timeoutId = setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, NotificationConfig.animationDuration);
        }
    }, duration);

    // Allow manual dismissal to cancel timeout
    toast.addEventListener('click', (e) => {
        if (e.target.closest('button')) {
            clearTimeout(timeoutId);
        }
    });
}

// =====================================================
// MODAL DIALOG SYSTEM (Blocking, Requires User Action)
// =====================================================

/**
 * Shows a modal dialog (blocking, requires user action)
 * Best for: Errors, important information, confirmations
 * 
 * @param {string} title - Modal title
 * @param {string} message - Modal message (supports HTML)
 * @param {string} type - 'info', 'success', 'error', 'warning'
 * @param {object} options - Additional options
 *   - buttonText: "OK" (default for single button)
 *   - onClose: callback function
 */
function showModal(title, message, type = 'info', options = {}) {
    const {
        buttonText = 'OK',
        onClose = null
    } = options;

    const colorMap = {
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    };

    const iconMap = {
        'success': '✓',
        'error': '✕',
        'warning': '⚠',
        'info': 'ℹ'
    };

    const borderColor = colorMap[type] || colorMap['info'];
    const icon = iconMap[type] || '•';

    // Remove existing modal if any
    const existingModal = document.getElementById('notification-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.id = 'notification-modal';
    modal.className = 'modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.3s ease-in;
        align-items: center;
        justify-content: center;
    `;

    modal.innerHTML = `
        <div class="modal-content modal-${type}" style="
            max-width: 500px;
            border-top: 5px solid ${borderColor};
            animation: slideDown 0.3s ease-out;
        ">
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 15px;
            ">
                <div style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex: 1;
                ">
                    <div style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: ${borderColor}20;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    ">
                        <span style="
                            color: ${borderColor};
                            font-size: 1.5rem;
                            font-weight: bold;
                        ">${icon}</span>
                    </div>
                    <h2 style="margin: 0; color: #2c3e50; font-size: 1.3rem; font-weight: 700;">${escapeHtml(title)}</h2>
                </div>
                <button onclick="document.getElementById('notification-modal').remove()" class="close-button" style="
                    background: none;
                    border: none;
                    font-size: 28px;
                    color: #aaa;
                    cursor: pointer;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    transition: all 0.2s;
                    margin-left: 10px;
                " onmouseover="this.style.backgroundColor='#f0f0f0'; this.style.color='#333';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#aaa';">
                    &times;
                </button>
            </div>
            
            <div style="
                color: #555;
                margin-bottom: 20px;
                line-height: 1.6;
                max-height: 300px;
                overflow-y: auto;
                font-size: 0.95rem;
                margin-left: 52px;
            ">
                ${message}
            </div>
            
            <div style="
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                margin-left: 52px;
            ">
                <button onclick="
                    const m = document.getElementById('notification-modal');
                    if (m) m.remove();
                " style="
                    padding: 10px 24px;
                    background-color: ${borderColor};
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                    box-shadow: 0 2px 8px ${borderColor}40;
                " onmouseover="this.style.backgroundColor='${adjustBrightness(borderColor, -0.1)}'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px ${borderColor}60';" onmouseout="this.style.backgroundColor='${borderColor}'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px ${borderColor}40';">
                    ${escapeHtml(buttonText)}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Call onClose callback when modal is removed
    if (onClose && typeof onClose === 'function') {
        const observer = new MutationObserver(() => {
            if (!document.getElementById('notification-modal')) {
                onClose();
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true });
    }
}

/**
 * Shows a confirmation dialog (modal, requires user choice)
 * Best for: Destructive actions (delete, clear), important decisions
 * 
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message (supports HTML)
 * @param {function} onConfirm - Callback if user clicks "Confirm"
 * @param {object} options - Additional options
 *   - confirmText: "Confirm" (button text)
 *   - cancelText: "Cancel" (button text)
 *   - type: 'warning' (default) or other types for color
 *   - onCancel: callback if user clicks "Cancel"
 */
function showConfirm(title, message, onConfirm, options = {}) {
    const {
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        type = 'warning',
        onCancel = null
    } = options;

    const colorMap = {
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    };

    const borderColor = colorMap[type] || colorMap['warning'];

    // Remove existing modal if any
    const existingModal = document.getElementById('notification-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.id = 'notification-modal';
    modal.className = 'modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.3s ease-in;
        align-items: center;
        justify-content: center;
    `;

    modal.innerHTML = `
        <div class="modal-content" style="
            max-width: 500px;
            border-top: 5px solid ${borderColor};
            animation: slideDown 0.3s ease-out;
        ">
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            ">
                <h2 style="margin: 0; color: #333; font-size: 1.5rem;">${escapeHtml(title)}</h2>
                <button onclick="document.getElementById('notification-modal').remove()" class="close-button">
                    &times;
                </button>
            </div>
            
            <div style="
                color: #555;
                margin-bottom: 25px;
                line-height: 1.6;
                max-height: 300px;
                overflow-y: auto;
            ">
                ${message}
            </div>
            
            <div style="
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            ">
                <button onclick="document.getElementById('notification-modal').remove()" style="
                    padding: 10px 20px;
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: opacity 0.2s;
                " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                    ${escapeHtml(cancelText)}
                </button>
                <button onclick="
                    document.getElementById('notification-modal').remove();
                    if (typeof window.notificationConfirmCallback === 'function') {
                        window.notificationConfirmCallback();
                    }
                " style="
                    padding: 10px 20px;
                    background-color: ${borderColor};
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: opacity 0.2s;
                " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                    ${escapeHtml(confirmText)}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Store callbacks globally for closure access
    window.notificationConfirmCallback = onConfirm;
    window.notificationCancelCallback = onCancel;

    // Close on backdrop click (calls cancel)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            if (onCancel && typeof onCancel === 'function') {
                onCancel();
            }
        }
    });
}

/**
 * Shows a login confirmation dialog (modal, gives user choice)
 * Best for: Asking users if they want to log in before proceeding
 * 
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message (supports HTML)
 * @param {function} onLoginClick - Callback if user clicks "Continue to Login"
 * @param {object} options - Additional options
 *   - loginText: "Continue to Login" (button text)
 *   - browseText: "Keep Browsing" (button text)
 *   - onBrowseClick: callback if user clicks "Keep Browsing"
 */
function showLoginConfirm(title, message, onLoginClick, options = {}) {
    const {
        loginText = 'Continue to Login',
        browseText = 'Keep Browsing',
        onBrowseClick = null
    } = options;

    const borderColor = '#28a745'; // Green for login action

    // Remove existing modal if any
    const existingModal = document.getElementById('notification-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.id = 'notification-modal';
    modal.className = 'modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.3s ease-in;
        align-items: center;
        justify-content: center;
    `;

    modal.innerHTML = `
        <div class="modal-content" style="
            max-width: 500px;
            border-top: 5px solid ${borderColor};
            animation: slideDown 0.3s ease-out;
        ">
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 15px;
            ">
                <div style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex: 1;
                ">
                    <div style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: ${borderColor}20;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    ">
                        <span style="
                            color: ${borderColor};
                            font-size: 1.5rem;
                            font-weight: bold;
                        ">🔑</span>
                    </div>
                    <h2 style="margin: 0; color: #2c3e50; font-size: 1.3rem; font-weight: 700;">${escapeHtml(title)}</h2>
                </div>
                <button onclick="document.getElementById('notification-modal').remove()" class="close-button" style="
                    background: none;
                    border: none;
                    font-size: 28px;
                    color: #aaa;
                    cursor: pointer;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    transition: all 0.2s;
                    margin-left: 10px;
                " onmouseover="this.style.backgroundColor='#f0f0f0'; this.style.color='#333';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#aaa';">
                    &times;
                </button>
            </div>
            
            <div style="
                color: #555;
                margin-bottom: 25px;
                line-height: 1.6;
                max-height: 300px;
                overflow-y: auto;
                font-size: 0.95rem;
                margin-left: 52px;
            ">
                ${message}
            </div>
            
            <div style="
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                margin-left: 52px;
            ">
                <button onclick="
                    document.getElementById('notification-modal').remove();
                    if (typeof window.notificationBrowseCallback === 'function') {
                        window.notificationBrowseCallback();
                    }
                " style="
                    padding: 10px 24px;
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                    box-shadow: 0 2px 8px rgba(108, 117, 125, 0.4);
                " onmouseover="this.style.backgroundColor='#5a6268'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(108, 117, 125, 0.6)';" onmouseout="this.style.backgroundColor='#6c757d'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(108, 117, 125, 0.4)';">
                    ${escapeHtml(browseText)}
                </button>
                <button onclick="
                    document.getElementById('notification-modal').remove();
                    if (typeof window.notificationLoginCallback === 'function') {
                        window.notificationLoginCallback();
                    }
                " style="
                    padding: 10px 24px;
                    background-color: ${borderColor};
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                    box-shadow: 0 2px 8px ${borderColor}40;
                " onmouseover="this.style.backgroundColor='${adjustBrightness(borderColor, -0.1)}'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px ${borderColor}60';" onmouseout="this.style.backgroundColor='${borderColor}'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px ${borderColor}40';">
                    ${escapeHtml(loginText)}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Store callbacks globally for closure access
    window.notificationLoginCallback = onLoginClick;
    window.notificationBrowseCallback = onBrowseClick;

    // Close on backdrop click (calls browse/cancel)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            if (onBrowseClick && typeof onBrowseClick === 'function') {
                onBrowseClick();
            }
        }
    });
}

/**
 * Shows a prompt dialog (modal, requires text input)
 * Best for: Getting user input without page navigation
 * 
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {function} onSubmit - Callback with input value: onSubmit(inputValue)
 * @param {object} options - Additional options
 *   - placeholder: "Enter text..."
 *   - defaultValue: ""
 *   - submitText: "Submit"
 *   - cancelText: "Cancel"
 *   - onCancel: callback if user clicks "Cancel"
 *   - inputType: "text" (default) or "email", "number", etc.
 */
function showPrompt(title, message, onSubmit, options = {}) {
    const {
        placeholder = 'Enter text...',
        defaultValue = '',
        submitText = 'Submit',
        cancelText = 'Cancel',
        onCancel = null,
        inputType = 'text'
    } = options;

    // Remove existing modal if any
    const existingModal = document.getElementById('notification-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.id = 'notification-modal';
    modal.className = 'modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.3s ease-in;
        align-items: center;
        justify-content: center;
    `;

    const inputId = 'prompt-input-' + Date.now();

    modal.innerHTML = `
        <div class="modal-content" style="
            max-width: 500px;
            border-top: 5px solid #17a2b8;
            animation: slideDown 0.3s ease-out;
        ">
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            ">
                <h2 style="margin: 0; color: #333; font-size: 1.5rem;">${escapeHtml(title)}</h2>
                <button onclick="document.getElementById('notification-modal').remove()" class="close-button">
                    &times;
                </button>
            </div>
            
            <div style="color: #555; margin-bottom: 15px; line-height: 1.6;">
                ${message}
            </div>
            
            <input 
                id="${inputId}" 
                type="${inputType}" 
                placeholder="${escapeHtml(placeholder)}"
                value="${escapeHtml(defaultValue)}"
                style="
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 1rem;
                    margin-bottom: 20px;
                    box-sizing: border-box;
                "
                onkeypress="if(event.key === 'Enter') document.getElementById('prompt-submit-btn').click();"
            />
            
            <div style="
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            ">
                <button onclick="document.getElementById('notification-modal').remove()" style="
                    padding: 10px 20px;
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: opacity 0.2s;
                " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                    ${escapeHtml(cancelText)}
                </button>
                <button id="prompt-submit-btn" onclick="
                    const value = document.getElementById('${inputId}').value;
                    document.getElementById('notification-modal').remove();
                    if (typeof window.notificationPromptCallback === 'function') {
                        window.notificationPromptCallback(value);
                    }
                " style="
                    padding: 10px 20px;
                    background-color: #17a2b8;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: opacity 0.2s;
                " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                    ${escapeHtml(submitText)}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Store callback globally
    window.notificationPromptCallback = onSubmit;

    // Focus input field
    setTimeout(() => {
        const input = document.getElementById(inputId);
        if (input) {
            input.focus();
            input.select();
        }
    }, 100);

    // Close on backdrop click (calls cancel)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            if (onCancel && typeof onCancel === 'function') {
                onCancel();
            }
        }
    });
}

// =====================================================
// HELPER UTILITIES
// =====================================================

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Shows a loading/processing indicator in a modal
 * @param {string} message - Loading message
 * @returns {object} - Object with close() method
 */
function showLoading(message = 'Processing...') {
    const modal = document.createElement('div');
    modal.id = 'loading-modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        z-index: 2500;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        animation: fadeIn 0.3s ease-in;
        align-items: center;
        justify-content: center;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideDown 0.3s ease-out;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #17a2b8;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <p style="color: #555; font-size: 1.1rem; margin: 0; font-weight: 500;">
                ${escapeHtml(message)}
            </p>
        </div>
    `;

    document.body.appendChild(modal);

    return {
        close: () => {
            if (modal.parentNode) {
                modal.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.remove();
                    }
                }, 300);
            }
        }
    };
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Adjust brightness of a hex color
 * @param {string} color - Hex color string
 * @param {number} percent - Brightness adjustment (-1 to 1)
 * @returns {string} - Adjusted hex color
 */
function adjustBrightness(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent * 100);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

// =====================================================
// EXPORT TO GLOBAL SCOPE
// =====================================================

window.showToast = showToast;
window.showModal = showModal;
window.showConfirm = showConfirm;
window.showLoginConfirm = showLoginConfirm;
window.showPrompt = showPrompt;
window.showLoading = showLoading;
window.adjustBrightness = adjustBrightness;
