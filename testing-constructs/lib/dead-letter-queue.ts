import cloudwatch = require('@aws-cdk/aws-cloudwatch');
import sqs = require('@aws-cdk/aws-sqs');
import { Construct, Duration } from '@aws-cdk/core';

export interface DeadLetterQueueProps{
    retentionDays?: number;
}
export class DeadLetterQueue extends sqs.Queue {
  public readonly messagesInQueueAlarm: cloudwatch.IAlarm;

  constructor(scope: Construct, id: string, props: DeadLetterQueueProps = {}) {
    if (props.retentionDays !== undefined && props.retentionDays > 14) {
      throw new Error('retentionDays may not exceed 14 days');
    }

    super(scope, id, {
        // Given retention period or maximum
        retentionPeriod: Duration.days(props.retentionDays || 14)
    });
  }
}