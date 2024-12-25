# ReactTS Tailwind FiveM | Boilerplate
Este boilerplate suporta comunicação entre o backend do FiveM e a interface NUI.

## Enviando mensagens para a NUI
Abaixo está um exemplo direto de como enviar mensagens do BackEnd (Lua) para o NUI.

### Uso na NUI

```ts
observe<Tipagem>(action, handler);
```

### Uso no BackEnd

```lua
-- Exemplo: Enviando uma mensagem para o NUI com dados específicos
RegisterCommand("sendToNui", function(source, args, rawCommand)
    -- Define os dados que serão enviados
    local message = {
        action = "myAction", -- Nome da ação que o NUI vai observar
        data = {
            someData = "Olá, NUI!", -- Dados enviados
            timestamp = os.time()   -- Exemplo de timestamp
        }
    }
    -- Envia a mensagem para o NUI
    SendNuiMessage(message)
end, false)
```

## Recebendo mensagens da NUI

Este boilerplate inclui uma classe `Post` que facilita a comunicação do NUI com o backend do FiveM. O BackEnd pode usar o `RegisterNUICallback` para tratar essas requisições e enviar uma resposta ao NUI.

### Uso na NUI

```ts
Post.create<Tipagem>(eventName, data, cbHandler);
```

### Uso no BackEnd

```lua
-- Exemplo: Enviando uma mensagem para o NUI com dados específicos
-- Registro de um evento para tratar requisições do NUI
RegisterNUICallback("myEvent", function(data, Callback)
    print("Dados recebidos do NUI:", json.encode(data))
    local success = true
    Callback({
        success = success,
        message = success and "Operação realizada com sucesso!" or "Erro ao processar."
    })
end)

```
