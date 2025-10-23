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

// All original JS logic remains identical
// (renderTools, openTool, closeModal, processHash, etc.)
