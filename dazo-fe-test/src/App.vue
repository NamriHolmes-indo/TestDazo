<template>
  <div class="chat-wrapper">
    <div class="chat-container">
      <div class="chat-messages" ref="scrollArea">
        <div v-for="(msg, i) in messages" :key="i" :class="['chat-row', msg.role]">
          <div class="bubble">
            <span v-if="msg.loading" class="loading">
              <span>.</span><span>.</span><span>.</span>
            </span>

            <div v-else v-html="msg.role === 'bot' ? renderMarkdown(msg.text) : msg.text" />
          </div>
        </div>
      </div>

      <div class="chat-input">
        <a-textarea
          v-model:value="input"
          placeholder="Tulis pesan..."
          :auto-size="{ minRows: 1, maxRows: 6 }"
          @keydown.enter="handleEnter"
        />

        <a-button type="primary" @click="sendMessage" :disabled="isSending">
          <LoadingOutlined v-if="isSending" spin />
          <SendOutlined v-else />
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import { SendOutlined, LoadingOutlined } from '@ant-design/icons-vue'

const isSending = ref(false)

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
})

interface ChatMessage {
  role: 'user' | 'bot'
  text: string
  loading?: boolean
}

const API_URL = import.meta.env.VITE_API_URL as string

const input = ref<string>('')
const messages = ref<ChatMessage[]>([])
const scrollArea = ref<HTMLDivElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (scrollArea.value) {
      scrollArea.value.scrollTop = scrollArea.value.scrollHeight
    }
  })
}

async function sendMessage() {
  if (!input.value.trim()) return
  if (!input.value.trim() || isSending.value) return

  isSending.value = true

  const userText = input.value

  messages.value.push({
    role: 'user',
    text: userText,
  })

  input.value = ''

  const botMsg: ChatMessage = {
    role: 'bot',
    text: '',
    loading: true,
  }

  messages.value.push(botMsg)
  scrollToBottom()

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText }),
    })

    if (!res.ok) throw new Error()

    const data = await res.json()
    console.log('Response:', data)

    const index = messages.value.indexOf(botMsg)

    messages.value[index] = {
      role: 'bot',
      text: '',
      loading: false,
    }

    typeText(messages.value[index], data.reply || 'Tidak ada response')
  } catch {
    const index = messages.value.indexOf(botMsg)

    messages.value[index] = {
      role: 'bot',
      text: 'Terjadi kesalahan server',
      loading: false,
    }
  }

  scrollToBottom()
  isSending.value = false
}

function typeText(msg: ChatMessage, fullText: string) {
  let i = 0

  const interval = setInterval(() => {
    if (i < fullText.length) {
      msg.text += fullText.charAt(i)
      i++
      scrollToBottom()
    } else {
      clearInterval(interval)
    }
  }, 18)
}

function handleEnter(e: KeyboardEvent) {
  if (!e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

function renderMarkdown(text: string) {
  return md.render(text)
}

watch(
  messages,
  () => {
    scrollToBottom()
  },
  { deep: true },
)
</script>

<style>
.chat-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.chat-container {
  width: 90vw;
  max-width: 1200px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #fafafa;
}

.chat-row {
  display: flex;
  margin-bottom: 12px;
}

.chat-row.user {
  justify-content: flex-end;
}

.chat-row.bot {
  justify-content: flex-start;
}

.bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 14px;
  text-align: justify;
  line-height: 1.6;
}

.chat-row.user .bubble {
  background: #1677ff;
  color: white;
}

.chat-row.bot .bubble {
  background: white;
  border: 1px solid #ddd;
}

.chat-input {
  display: flex;
  gap: 10px;
  padding: 16px;
  border-top: 1px solid #eee;
  background: white;
}

.loading span {
  animation: blink 1.4s infinite;
  font-size: 30px;
}

.loading span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  animation-delay: 0.4s;
}

.bubble ul {
  padding-left: 18px;
  margin: 8px 0;
}

.bubble strong {
  font-weight: 600;
}

.bubble p {
  margin: 6px 0;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
