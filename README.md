# AWS Lambda를 사용한 Audio를 요약하는 코드

이 리포지토리에는 AWS Lambda를 사용하여 오디오 데이터를 요약하는 프로세스를 보여주는 코드가 포함되어 있습니다.


## 개요

브라우저상에서 오디오데이터를 적은 리소스로 시각화하기 위해서 데이터 저장시에 썸네일용으로 데이터가 필요하여 만듬.


## 요구 사항

Audio Data를 시각화하기 위해선 Audio Waveform이 필요함.  
일반적으로 Web상에서는 Audio Date => AudioBuffer => 시각화를 진행  
하지만 AWS의 LambDa상에서는 Web-audio-api를 사용할수 없음.  
따라서 폴리필로 구현된 라이브러리를 통해서 우회적으로 구현.


## 자세한 설명은 블로그에서
