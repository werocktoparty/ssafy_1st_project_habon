<template>
    <div class="home-container">
        <header class="header">
            <h1>이상형 월드컵</h1>
            <p>최고의 이상형을 선택하세요!</p>
        </header>
        <section class="content">
            <div class="intro">
                <p>여러 후보 중에서 당신의 이상형을 골라보세요. </p><p>매 라운드마다 두 후보 중 하나를 선택할 수 있습니다. 최종적으로 당신이 선택한 최고의 이상형이 결정됩니다!</p>
            </div>
            <div class="start-button">
                <RouterLink to="/worldcup" class="button">시작하기</RouterLink>
            </div>
        </section>
    </div>
</template>

<script setup>

</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #ffcc00; /* Vibrant background color */
    min-height: 100vh;
    background-image: url('@/assets/img/back.jpg');
    background-position: center;
    background-size: cover;
}

.header {
    text-align: center;
    margin-bottom: 40px;
    animation: fadeIn 2s ease-in-out; /* Added fade-in animation */
}

.header h1 {
    font-size: 70px;
    color: #a78a8a;
    animation: fadeIn 2s ease-in-out; /* Added fade-in animation */
}

.header p {
    font-size: 35px;
    color: #c28a8a; /* Changed text color to match better */
    animation: fadeIn 3s ease-in-out; /* Added fade-in animation */
}

.content {
    width: 100%;
    max-width: 800px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
    padding: 20px; /* Padding around text */
    border-radius: 10px; /* Rounded corners */
    animation: fadeIn 4s ease-in-out; /* Added fade-in animation */
}

.intro {
    margin-bottom: 30px;
}

.intro p {
    font-size: 30px;
    color: #333; /* Changed text color to match better */
    line-height: 1.5;
    animation: fadeIn 4s ease-in-out; /* Added fade-in animation */
}

.start-button {
    display: flex;
    justify-content: center;
    animation: fadeIn 5s ease-in-out; /* Added fade-in animation */
}

.button {
    display: inline-block;
    padding: 15px 30px;
    font-size: 20px;
    color: white;
    background-color: #626dcf;
    border: none;
    border-radius: 10px;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #df52df;
}
</style>
