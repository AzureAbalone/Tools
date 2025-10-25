const tools = {
    'Hash Functions': [
        { name: 'MD5', desc: 'Generate MD5 hash', type: 'hash', algo: 'MD5' },
        { name: 'SHA-1', desc: 'Generate SHA-1 hash', type: 'hash', algo: 'SHA1' },
        { name: 'SHA-256', desc: 'Generate SHA-256 hash', type: 'hash', algo: 'SHA256' },
        { name: 'SHA-512', desc: 'Generate SHA-512 hash', type: 'hash', algo: 'SHA512' },
        { name: 'SHA-3', desc: 'Generate SHA-3 hash', type: 'hash', algo: 'SHA3' },
    ],
    'Encoding / Decoding': [
        { name: 'Base64 Encode', desc: 'Encode text to Base64', type: 'base64', action: 'encode' },
        { name: 'Base64 Decode', desc: 'Decode Base64 to text', type: 'base64', action: 'decode' },
        { name: 'URL Encode', desc: 'Encode URL parameters', type: 'url', action: 'encode' },
        { name: 'URL Decode', desc: 'Decode URL parameters', type: 'url', action: 'decode' },
        { name: 'HTML Encode', desc: 'Encode HTML entities', type: 'html', action: 'encode' },
        { name: 'HTML Decode', desc: 'Decode HTML entities', type: 'html', action: 'decode' },
    ],
    'Text Tools': [
        { name: 'Text Case Converter', desc: 'Convert text case', type: 'textcase' },
        { name: 'Word Counter', desc: 'Count words and characters', type: 'wordcount' },
        { name: 'Lorem Ipsum', desc: 'Generate placeholder text', type: 'lorem' },
        { name: 'UUID Generator', desc: 'Generate unique identifiers', type: 'uuid' },
    ],
    'Formatters': [
        { name: 'JSON Formatter', desc: 'Format and validate JSON', type: 'json' },
        { name: 'XML Formatter', desc: 'Format and validate XML', type: 'xml' },
        { name: 'SQL Formatter', desc: 'Format SQL queries', type: 'sql' },
    ]
};

function renderTools(filter = '') {
    const container = document.getElementById('categoriesContainer');
    const noResults = document.getElementById('noResults');
    container.innerHTML = '';
    let hasResults = false;

    Object.entries(tools).forEach(([category, categoryTools]) => {
        const filteredTools = categoryTools.filter(tool => 
            tool.name.toLowerCase().includes(filter.toLowerCase()) ||
            tool.desc.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredTools.length > 0) {
            hasResults = true;
            const section = document.createElement('div');
            section.className = 'category-section';
            section.innerHTML = `
                <h2 class="category-title">
                    <span class="category-icon">${getCategoryIcon(category)}</span>
                    ${category}
                </h2>
                <div class="tools-grid">
                    ${filteredTools.map(tool => `
                        <div class="tool-card" onclick='openTool(${JSON.stringify(tool)})'>
                            <h3>${tool.name}</h3>
                            <p>${tool.desc}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(section);
        }
    });

    noResults.style.display = hasResults ? 'none' : 'block';
}

function getCategoryIcon(category) {
    const icons = {
        'Hash Functions': '#️⃣',
        'Encoding / Decoding': '🔄',
        'Text Tools': '📝',
        'Formatters': '✨'
    };
    return icons[category] || '🔧';
}

function openTool(tool) {
    document.getElementById('modalTitle').textContent = tool.name;
    const interface = document.getElementById('toolInterface');
    
    if (tool.type === 'hash') {
        interface.innerHTML = `
            <div class="input-group">
                <label>Input Text</label>
                <textarea id="inputText" rows="6" placeholder="Enter text to hash..."></textarea>
            </div>
            <div class="button-group">
                <button class="btn" onclick="processHash('${tool.algo}')">Generate Hash</button>
                <button class="btn btn-secondary" onclick="copyResult()">Copy Result</button>
            </div>
            <div class="input-group">
                <label>Result</label>
                <div class="result-box" id="result"></div>
            </div>
        `;
    } else if (tool.type === 'base64') {
        interface.innerHTML = `
            <div class="input-group">
                <label>Input</label>
                <textarea id="inputText" rows="6" placeholder="Enter text..."></textarea>
            </div>
            <div class="button-group">
                <button class="btn" onclick="processBase64('${tool.action}')">${tool.action === 'encode' ? 'Encode' : 'Decode'}</button>
                <button class="btn btn-secondary" onclick="copyResult()">Copy Result</button>
            </div>
            <div class="input-group">
                <label>Result</label>
                <div class="result-box" id="result"></div>
            </div>
        `;
    } else if (tool.type === 'url') {
        interface.innerHTML = `
            <div class="input-group">
                <label>Input</label>
                <textarea id="inputText" rows="6" placeholder="Enter text..."></textarea>
            </div>
            <div class="button-group">
                <button class="btn" onclick="processURL('${tool.action}')">${tool.action === 'encode' ? 'Encode' : 'Decode'}</button>
                <button class="btn btn-secondary" onclick="copyResult()">Copy Result</button>
            </div>
            <div class="input-group">
                <label>Result</label>
                <div class="result-box" id="result"></div>
            </div>
        `;
    } else if (tool.type === 'html') {
        interface.innerHTML = `
            <div class="input-group">
                <label>Input</label>
                <textarea id="inputText" rows="6" placeholder="Enter text..."></textarea>
            </div>
            <div class="button-group">
                <button class="btn" onclick="processHTML('${tool.action}')">${tool.action === 'encode' ? 'Encode' : 'Decode'}</button>
                <button class="btn btn-secondary" onclick="copyResult()">Copy Result</button>
            </div>
            <div class="input-group">
                <label>Result</label>
                <div class="result-box" id="result"></div>
            </div>
        `;
    } else if (tool.type === 'json') {
        interface.innerHTML = `
            <div class="input-group">
                <label>JSON Input</label>
                <textarea id="inputText" rows="10" placeholder="Enter JSON..."></textarea>
            </div>
            <div class="button-group">
                <button class="btn" onclick="formatJSON()">Format JSON</button>
                <button class="btn btn-secondary" onclick="minifyJSON()">Minify</button>
                <button class="btn btn-secondary" onclick="copyResult()">Copy Result</button>
            </div>
            <div class="input-group">
                <label>Result</label>
                <div class="result-box" id="result"></div>
            </div>
        `;
    } else if (tool.type === 'textcase') {
        interface.innerHTML = `
            <div class="input-group">
                <label>Input Text</label>
                <textarea id="inputText" rows="6" placeholder="Enter text..."></textarea>
            </div>
            <div class="button-group">
                <button class="btn" onclick="convertCase('upper')">UPPERCASE</button>
                <button class="btn" onclick="convertCase('lower')">lowercase</button>
                <button class="btn" onclick="convertCase('title')">Title Case</button>
                <button class="btn btn-secondary" onclick="copyResult()">Copy Result</button>
            </div>
            <div class="input-group">
                <label>Result</label>
                <div class="result-box" id="result"></div>
            </div>
        `;
    } else if (tool.type === 'wordcount') {
        interface.innerHTML = `
            <div class="input-group">
                <label>Input Text</label>
                <textarea id="inputText" rows="10" placeholder="Enter text..." oninput="countWords()"></textarea>
            </div>
            <div class="result-box" id="result">
                Characters: 0<br>
                Words: 0<br>
                Lines: 0
            </div>
        `;
    } else if (tool.type === 'uuid') {
        interface.innerHTML = `
            <div class="button-group">
                <button class="btn" onclick="generateUUID()">Generate UUID</button>
                <button class="btn btn-secondary" onclick="copyResult()">Copy</button>
            </div>
            <div class="input-group">
                <label>Generated UUID</label>
                <div class="result-box" id="result"></div>
            </div>
        `;
    } else if (tool.type === 'lorem') {
        interface.innerHTML = `
            <div class="input-group">
                <label>Number of Paragraphs</label>
                <select id="paraCount">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3" selected>3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div class="button-group">
                <button class="btn" onclick="generateLorem()">Generate</button>
                <button class="btn btn-secondary" onclick="copyResult()">Copy</button>
            </div>
            <div class="input-group">
                <label>Result</label>
                <div class="result-box" id="result"></div>
            </div>
        `;
    } else {
        interface.innerHTML = `<p>Tool interface coming soon...</p>`;
    }

    document.getElementById('toolModal').classList.add('active');
}

function closeModal() {
    document.getElementById('toolModal').classList.remove('active');
}

function processHash(algo) {
    const input = document.getElementById('inputText').value;
    let hash = '';
    
    switch(algo) {
        case 'MD5':
            hash = CryptoJS.MD5(input).toString();
            break;
        case 'SHA1':
            hash = CryptoJS.SHA1(input).toString();
            break;
        case 'SHA256':
            hash = CryptoJS.SHA256(input).toString();
            break;
        case 'SHA512':
            hash = CryptoJS.SHA512(input).toString();
            break;
        case 'SHA3':
            hash = CryptoJS.SHA3(input).toString();
            break;
    }
    
    document.getElementById('result').textContent = hash;
}

function processBase64(action) {
    const input = document.getElementById('inputText').value;
    try {
        const result = action === 'encode' 
            ? btoa(input)
            : atob(input);
        document.getElementById('result').textContent = result;
    } catch (e) {
        document.getElementById('result').textContent = 'Error: Invalid input';
    }
}

function processURL(action) {
    const input = document.getElementById('inputText').value;
    try {
        const result = action === 'encode'
            ? encodeURIComponent(input)
            : decodeURIComponent(input);
        document.getElementById('result').textContent = result;
    } catch (e) {
        document.getElementById('result').textContent = 'Error: Invalid input';
    }
}

function processHTML(action) {
    const input = document.getElementById('inputText').value;
    const textarea = document.createElement('textarea');
    
    if (action === 'encode') {
        const div = document.createElement('div');
        div.textContent = input;
        document.getElementById('result').textContent = div.innerHTML;
    } else {
        textarea.innerHTML = input;
        document.getElementById('result').textContent = textarea.value;
    }
}

function formatJSON() {
    const input = document.getElementById('inputText').value;
    try {
        const parsed = JSON.parse(input);
        document.getElementById('result').textContent = JSON.stringify(parsed, null, 2);
    } catch (e) {
        document.getElementById('result').textContent = 'Error: Invalid JSON';
    }
}

function minifyJSON() {
    const input = document.getElementById('inputText').value;
    try {
        const parsed = JSON.parse(input);
        document.getElementById('result').textContent = JSON.stringify(parsed);
    } catch (e) {
        document.getElementById('result').textContent = 'Error: Invalid JSON';
    }
}

function convertCase(type) {
    const input = document.getElementById('inputText').value;
    let result = '';
    
    switch(type) {
        case 'upper':
            result = input.toUpperCase();
            break;
        case 'lower':
            result = input.toLowerCase();
            break;
        case 'title':
            result = input.replace(/\w\S*/g, txt => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
            break;
    }
    
    document.getElementById('result').textContent = result;
}

function countWords() {
    const input = document.getElementById('inputText').value;
    const chars = input.length;
    const words = input.trim() ? input.trim().split(/\s+/).length : 0;
    const lines = input.split('\n').length;
    
    document.getElementById('result').innerHTML = `
        Characters: ${chars}<br>
        Words: ${words}<br>
        Lines: ${lines}
    `;
}

function generateUUID() {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    document.getElementById('result').textContent = uuid;
}

function generateLorem() {
    const count = parseInt(document.getElementById('paraCount').value);
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    
    const paragraphs = Array(count).fill(lorem).join('\n\n');
    document.getElementById('result').textContent = paragraphs;
}

function copyResult() {
    const result = document.getElementById('result').textContent;
    navigator.clipboard.writeText(result).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    renderTools(e.target.value);
});

document.getElementById('toolModal').addEventListener('click', (e) => {
    if (e.target.id === 'toolModal') {
        closeModal();
    }
});

renderTools();
