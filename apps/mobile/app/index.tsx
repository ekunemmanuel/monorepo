import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { api } from "@monorepo/convex";
import { useQuery, useMutation } from "@monorepo/convex/react";
import { withUniwind } from "uniwind";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledSafeAreaView = withUniwind(SafeAreaView);
const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledTextInput = withUniwind(TextInput);
const StyledTouchableOpacity = withUniwind(TouchableOpacity);
const StyledScrollView = withUniwind(ScrollView);

export default function Index() {
  const tasks = useQuery(api.tasks.list);
  const addTaskMutation = useMutation(api.tasks.add);
  const toggleTaskMutation = useMutation(api.tasks.toggle);
  const removeTaskMutation = useMutation(api.tasks.remove);

  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTask = async () => {
    if (!newTaskText.trim()) return;
    await addTaskMutation({ text: newTaskText });
    setNewTaskText("");
  };

  const toggleTask = (id: any) => {
    toggleTaskMutation({ id });
  };

  const removeTask = (id: any) => {
    removeTaskMutation({ id });
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <StyledView className="flex-1 px-6 pt-12">
          <StyledView className="mb-8 text-center">
            <StyledText className="text-3xl font-bold text-foreground tracking-tight">
              To-Do List
            </StyledText>
            <StyledText className="text-muted-foreground mt-2 font-medium text-sm">
              Stay organized and get things done.
            </StyledText>
          </StyledView>

          <StyledView className="flex-row gap-2 mb-6">
            <StyledTextInput
              className="flex-1 bg-muted/30 border border-border rounded-xl px-4 py-3 text-foreground font-medium outline-none"
              placeholder="Add a new task..."
              placeholderTextColor="#7a7a7a"
              value={newTaskText}
              onChangeText={setNewTaskText}
            />
            <StyledTouchableOpacity
              className="bg-primary px-6 py-3 rounded-xl justify-center items-center shadow-sm"
              onPress={handleAddTask}
            >
              <StyledText className="text-primary-foreground font-bold text-lg">
                Add
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          <StyledScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
          >
            {tasks === undefined ? (
              <StyledText className="text-center py-4 text-muted-foreground font-medium">
                Loading your tasks...
              </StyledText>
            ) : tasks.length === 0 ? (
              <StyledText className="text-center py-8 text-muted-foreground italic font-medium">
                No tasks yet. Add one above!
              </StyledText>
            ) : (
              <StyledView className="gap-3 pb-8">
                {tasks.map((task) => (
                  <StyledView
                    key={task._id}
                    className="bg-card border border-border rounded-xl p-4 flex-row items-center justify-between shadow-sm"
                  >
                    <StyledTouchableOpacity
                      className="flex-row items-center gap-4 flex-1"
                      onPress={() => toggleTask(task._id)}
                    >
                      <StyledView
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                          task.isCompleted
                            ? "bg-primary border-primary"
                            : "bg-transparent border-muted-foreground"
                        }`}
                      >
                        {task.isCompleted && (
                          <StyledText className="text-primary-foreground font-bold">
                            ✓
                          </StyledText>
                        )}
                      </StyledView>
                      <StyledText
                        className={`text-lg font-medium flex-1 ${
                          task.isCompleted
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        }`}
                      >
                        {task.text}
                      </StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                      className="p-2 rounded-full bg-muted/10 opacity-60"
                      onPress={() => removeTask(task._id)}
                    >
                      <StyledText className="text-muted-foreground font-bold text-lg">
                        ✕
                      </StyledText>
                    </StyledTouchableOpacity>
                  </StyledView>
                ))}
              </StyledView>
            )}
          </StyledScrollView>
        </StyledView>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}
