import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { ButtonComponent } from 'src/app/components/base-components/button/button.component';
import { InputFieldComponent } from 'src/app/components/base-components/input-field/input-field.component';
import { ChatMessageListComponent } from 'src/app/components/chat-message-list/chat-message-list.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [ChatMessageListComponent, ButtonComponent, InputFieldComponent]
})
export class ChatPage implements OnInit {
  private readonly chatService = inject(ChatService)
  private readonly authService = inject(AuthService)

  @Input() chatId!: string

  chat = computed(() => this.chatService.chats().find(chat => chat.id === this.chatId))

  constructor() {
    this.chatService.connectToSocket('Dennis');
  }

  ngOnInit(): void {
    console.log(this.chatId);
  }

  send(chatId: string) {
    if (document) {
      const message = (document.getElementById('chatinput') as HTMLInputElement).value || ''
      this.chatService.sendMessageByChatId({ chatId, message, authorId: this.authService.user()?.displayName || 'Hallo Ich bin kein User' })
    }
  }
}
