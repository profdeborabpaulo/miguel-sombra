
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [tarefa, setTarefa] = useState('');

  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Estudar React-Native', concluida: false },
    { id: 2, texto: 'Aprender useState', concluida: false },
  ]);

  function adicionarTarefa() {
    if (!tarefa.trim()) return;

    const novaTarefa = {
      id: Date.now(),
      texto: tarefa,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTarefa('');
  }

  function concluirTarefa(id: number) {
    setTarefas(
      tarefas.map((item) =>
        item.id === id
          ? { ...item, concluida: !item.concluida }
          : item
      )
    );
  }

  function excluirTarefa(id: number) {
    setTarefas(tarefas.filter((item) => item.id !== id));
  }

  const totalConcluidas = tarefas.filter(
    (item) => item.concluida
  ).length;

  return (
    <View style={styles.container}>
      <Ionicons name="list-circle" size={50} color="#2196f3" />

      <Text style={styles.title}>Gerenciador de Tarefas</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa:"
        value={tarefa}
        onChangeText={setTarefa}
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={adicionarTarefa}
      >
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.botaoAdicionarTexto}>ADICIONAR</Text>
      </TouchableOpacity>

      <Text style={styles.contador}>
        {totalConcluidas} de {tarefas.length} tarefas concluídas
      </Text>

      {tarefas.map((item) => (
        <View style={styles.itemContainer} key={item.id}>
          <TouchableOpacity
            style={styles.itemTexto}
            onPress={() => concluirTarefa(item.id)}
          >
            <Ionicons
              name={
                item.concluida
                  ? 'checkmark-circle'
                  : 'ellipse-outline'
              }
              size={22}
              color={item.concluida ? '#2e7d32' : '#2196f3'}
            />

            <Text
              style={[
                styles.item,
                item.concluida && styles.itemConcluido,
              ]}
            >
              {item.texto}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => excluirTarefa(item.id)}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color="#e53935"
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },

  botaoAdicionar: {
    flexDirection: 'row',
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  botaoAdicionarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },

  contador: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  itemTexto: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },

  item: {
    fontSize: 16,
    flexShrink: 1,
  },

  itemConcluido: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
});