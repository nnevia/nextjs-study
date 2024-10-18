'use server';

import { revalidatePath } from 'next/cache';
import { saveMeal } from './meals';
import { redirect } from 'next/navigation';

function isInvalidText(text) {
  return !text || String(text).trim() === '';
}

export async function shareMeal(prevState, formData) {
  // prevState : 이전의 상태, formData : 제출된 데이터
  // 키(name속성) 값(입력한 데이터) 쌍으로 데이터 저장
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.image) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal(meal);
  revalidatePath('/meals'); // meals 경로에 대한 유효성 다시 검사(중첩 된 경로는 영향 x)
  redirect('/meals');
}
