import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
    family: "SpoqaHanSans",
    src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf"
});

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 12,
        fontFamily: "SpoqaHanSans",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        margin: 0,
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    question: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: "bold",
    },
    answer: {
        fontSize: 14,
        marginBottom: 10,
    },
});

const Script = ({ selectedCategories, fontSize, lineHeight, title, checkedQuestions }) => {
    const getQuestionsForCategory = (category) => {
        return checkedQuestions[`${category}AnswerList`] || [];
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>{title || "스크립트 제목"}</Text>

                {selectedCategories.map((category) => {
                    const questions = getQuestionsForCategory(category);
                    return (
                        <View style={styles.section} key={category}>
                            <Text style={styles.categoryTitle}>{category}</Text>
                            {questions.length > 0 ? (
                                questions.map((question) => (
                                    <View key={question.qid}>
                                        <Text style={styles.question}>{question.question}</Text>
                                        <Text style={styles.answer}>
                                            {question.content.split("\n").map((line, index) => (
                                                <React.Fragment key={index}>
                                                    {line}
                                                    {"\n"}
                                                </React.Fragment>
                                            ))}
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.answer}>질문이 없습니다.</Text>
                            )}
                        </View>
                    );
                })}
            </Page>
        </Document>
    );
};

export default Script;
